import { SanityClient } from 'sanity';

export class BulkDeleteService {
  private client: SanityClient;
  private BATCH_SIZE = 50;

  constructor(client: SanityClient) {
    this.client = client;
  }

  async execute(
    ids: string[],
    onProgress: (processed: number, failed: number) => void,
    signal?: AbortSignal
  ) {
    let processed = 0;
    let failed = 0;

    for (let i = 0; i < ids.length; i += this.BATCH_SIZE) {
      if (signal?.aborted) break;

      const batchIds = ids.slice(i, i + this.BATCH_SIZE);
      const tx = this.client.transaction();

      for (const id of batchIds) {
        tx.delete(id);
      }

      try {
        await tx.commit();
        processed += batchIds.length;
      } catch (err) {
        console.error('Batch delete failed, falling back to individual deletes', err);
        for (const id of batchIds) {
          if (signal?.aborted) break;
          try {
            await this.client.delete(id);
            processed++;
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
