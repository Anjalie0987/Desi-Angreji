import { SanityClient } from 'sanity';
import { BulkActionType } from '../types';

export class BulkUpdateService {
  private client: SanityClient;
  private BATCH_SIZE = 25;

  constructor(client: SanityClient) {
    this.client = client;
  }

  async execute(
    ids: string[],
    action: BulkActionType,
    payload: any,
    onProgress: (processed: number, failed: number) => void,
    signal?: AbortSignal
  ) {
    let processed = 0;
    let failed = 0;

    for (let i = 0; i < ids.length; i += this.BATCH_SIZE) {
      if (signal?.aborted) break;

      const batchIds = ids.slice(i, i + this.BATCH_SIZE);
      const tx = this.client.transaction();

      if (action === 'publish' || action === 'unpublish') {
        // We need to fetch the documents first to copy them
        const docs = await this.client.fetch(`*[_id in $ids]`, { ids: batchIds });
        for (const doc of docs) {
          const { _id, _createdAt, _updatedAt, _rev, ...rest } = doc;
          
          if (action === 'publish' && _id.startsWith('drafts.')) {
            const pubId = _id.replace('drafts.', '');
            tx.createOrReplace({ ...rest, _id: pubId });
            tx.delete(_id);
          } else if (action === 'unpublish' && !_id.startsWith('drafts.')) {
            const draftId = `drafts.${_id}`;
            tx.createOrReplace({ ...rest, _id: draftId });
            tx.delete(_id);
          } else {
            // Nothing to do for this document (e.g. already published or already draft)
          }
        }
      } else {
        // Patch operations
        for (const id of batchIds) {
          switch (action) {
            case 'category':
              tx.patch(id, p => p.set({ category: { _type: 'reference', _ref: payload.categoryId } }));
              break;
            case 'author':
              if (payload.authorId) {
                tx.patch(id, p => p.set({ author: { _type: 'reference', _ref: payload.authorId } }));
              } else {
                tx.patch(id, p => p.unset(['author']));
              }
              break;
            case 'status':
              tx.patch(id, p => p.set({ status: payload.status }));
              break;
            case 'featured':
              tx.patch(id, p => p.set({ featured: payload.featured }));
              break;
          }
        }
      }

      try {
        await tx.commit();
        processed += batchIds.length;
      } catch (err) {
        console.error('Batch update failed, running sequentially fallback', err);
        // Fallback for patching
        for (const id of batchIds) {
          if (signal?.aborted) break;
          try {
            if (action === 'publish' || action === 'unpublish') {
              // Ignore fallback for publish/unpublish for now as it's rare to fail selectively
              failed++;
            } else {
              const singleTx = this.client.transaction();
              switch (action) {
                case 'category': singleTx.patch(id, p => p.set({ category: { _type: 'reference', _ref: payload.categoryId } })); break;
                case 'author': payload.authorId ? singleTx.patch(id, p => p.set({ author: { _type: 'reference', _ref: payload.authorId } })) : singleTx.patch(id, p => p.unset(['author'])); break;
                case 'status': singleTx.patch(id, p => p.set({ status: payload.status })); break;
                case 'featured': singleTx.patch(id, p => p.set({ featured: payload.featured })); break;
              }
              await singleTx.commit();
              processed++;
            }
          } catch (e) {
            failed++;
          }
        }
      }

      onProgress(processed, failed);
    }

    return { processed, failed };
  }
}
