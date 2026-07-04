import React, { useState, useEffect, useCallback } from 'react';
import { Card, Text, Stack, Box, Checkbox, Flex, Button, Spinner, Dialog } from '@sanity/ui';
import { useClient } from 'sanity';
import { IntentLink } from 'sanity/router';
import { BulkActionsToolbar } from './BulkActionsToolbar';
import { BulkUpdateService } from './services/BulkUpdateService';
import { BulkDeleteService } from './services/BulkDeleteService';
import { BulkActionType, BulkOperationState, StorySummary } from './types';

export default function BulkStoryManager() {
  const client = useClient({ apiVersion: '2023-01-01' });
  const [stories, setStories] = useState<StorySummary[]>([]);
  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);
  const [authors, setAuthors] = useState<{_id: string, name: string}[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const [operationState, setOperationState] = useState<BulkOperationState>({
    status: 'idle',
    total: 0,
    processed: 0,
    failed: 0,
    action: null,
    durationMs: 0,
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [fetchedStories, fetchedCats, fetchedAuthors] = await Promise.all([
      client.fetch(`*[_type == "article"] | order(_updatedAt desc) { 
        _id, title, slug, status, featured, 
        category->{_id, "title": name}, 
        author->{_id, name}, 
        _updatedAt 
      }`),
      client.fetch(`*[_type == "category" && !(_id in path("drafts.**"))]{_id, name}`),
      client.fetch(`*[_type == "author" && !(_id in path("drafts.**"))]{_id, name}`)
    ]);
    setStories(fetchedStories);
    setCategories(fetchedCats);
    setAuthors(fetchedAuthors);
    setIsLoading(false);
  }, [client]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(stories.map(s => s._id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    const newSet = new Set(selectedIds);
    if (checked) newSet.add(id);
    else newSet.delete(id);
    setSelectedIds(newSet);
  };

  const executeAction = async (action: BulkActionType, payload?: any) => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (action === 'delete' && !confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setConfirmDelete(false);

    setOperationState({
      status: 'running',
      total: ids.length,
      processed: 0,
      failed: 0,
      action,
      durationMs: 0,
    });

    const startTime = Date.now();
    let results;

    const onProgress = (processed: number, failed: number) => {
      setOperationState(prev => ({ ...prev, processed, failed }));
    };

    if (action === 'delete') {
      const svc = new BulkDeleteService(client);
      results = await svc.execute(ids, onProgress);
    } else {
      const svc = new BulkUpdateService(client);
      results = await svc.execute(ids, action, payload, onProgress);
    }

    setOperationState(prev => ({
      ...prev,
      status: 'completed',
      processed: results.processed,
      failed: results.failed,
      durationMs: Date.now() - startTime,
    }));

    setSelectedIds(new Set());
    loadData();
  };

  if (isLoading && stories.length === 0) {
    return (
      <Flex align="center" justify="center" height="fill">
        <Spinner muted />
      </Flex>
    );
  }

  return (
    <Box height="fill" style={{ backgroundColor: 'var(--card-bg-color)' }}>
      <BulkActionsToolbar 
        selectedCount={selectedIds.size} 
        onAction={executeAction}
        categories={categories}
        authors={authors}
      />

      {operationState.status === 'running' && (
        <Card padding={4} tone="primary" borderBottom>
          <Flex justify="space-between" align="center">
            <Text weight="semibold">
              {operationState.action === 'delete' ? 'Deleting' : 'Updating'} {operationState.processed} / {operationState.total}
            </Text>
            <Spinner />
          </Flex>
        </Card>
      )}

      {operationState.status === 'completed' && (
        <Card padding={4} tone="positive" borderBottom>
          <Stack space={3}>
            <Text weight="semibold">Operation Completed in {(operationState.durationMs / 1000).toFixed(1)}s</Text>
            <Flex gap={4}>
              <Text size={1}>Successful: {operationState.processed}</Text>
              <Text size={1} style={{ color: 'var(--card-critical-fg-color)' }}>Failed: {operationState.failed}</Text>
            </Flex>
            <Button text="Dismiss" mode="ghost" onClick={() => setOperationState(prev => ({ ...prev, status: 'idle' }))} />
          </Stack>
        </Card>
      )}

      {confirmDelete && (
        <Dialog 
          header="Confirm Bulk Delete"
          id="confirm-delete"
          onClose={() => setConfirmDelete(false)}
        >
          <Box padding={4}>
            <Text>You are about to permanently delete {selectedIds.size} stories. This action cannot be undone.</Text>
            <Flex gap={3} marginTop={4} justify="flex-end">
              <Button mode="ghost" text="Cancel" onClick={() => setConfirmDelete(false)} />
              <Button tone="critical" text="Delete Permanently" onClick={() => executeAction('delete')} />
            </Flex>
          </Box>
        </Dialog>
      )}

      <Box padding={4}>
        <Stack space={2}>
          <Card padding={3} borderBottom>
            <Flex align="center" gap={3}>
              <Checkbox 
                checked={selectedIds.size > 0 && selectedIds.size === stories.length}
                indeterminate={selectedIds.size > 0 && selectedIds.size < stories.length}
                onChange={e => handleSelectAll(e.currentTarget.checked)}
              />
              <Text weight="semibold" style={{ flex: 2 }}>Title</Text>
              <Text weight="semibold" style={{ flex: 1 }}>Status</Text>
              <Text weight="semibold" style={{ flex: 1 }}>Category</Text>
              <Text weight="semibold" style={{ flex: 1 }}>Author</Text>
            </Flex>
          </Card>

          {stories.map(story => {
            const isDraft = story._id.startsWith('drafts.');
            return (
              <Card key={story._id} padding={3} borderBottom style={{ opacity: isDraft ? 0.7 : 1 }}>
                <Flex align="center" gap={3}>
                  <Checkbox 
                    checked={selectedIds.has(story._id)}
                    onChange={e => handleSelect(story._id, e.currentTarget.checked)}
                  />
                  <Box style={{ flex: 2 }}>
                    <IntentLink intent="edit" params={{ id: story._id, type: 'article' }} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Text weight="medium">{story.title || 'Untitled'}</Text>
                      {story.slug && <Box marginTop={2}><Text size={1} muted>{story.slug.current}</Text></Box>}
                    </IntentLink>
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Flex gap={2}>
                      <Text size={1}>{story.status}</Text>
                      {isDraft && <Text size={1} muted>(Draft)</Text>}
                      {story.featured && <Text size={1} style={{ color: 'var(--card-primary-fg-color)' }}>★ Featured</Text>}
                    </Flex>
                  </Box>
                  <Text style={{ flex: 1 }} size={1} muted>{story.category?.title || 'None'}</Text>
                  <Text style={{ flex: 1 }} size={1} muted>{story.author?.name || 'None'}</Text>
                </Flex>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
