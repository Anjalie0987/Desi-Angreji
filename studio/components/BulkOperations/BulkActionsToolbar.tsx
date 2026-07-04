import React from 'react';
import { Card, Flex, Text, Button, Select, Box } from '@sanity/ui';
import { BulkActionType } from './types';

interface BulkActionsToolbarProps {
  selectedCount: number;
  onAction: (action: BulkActionType, payload?: any) => void;
  categories: { _id: string, name: string }[];
  authors: { _id: string, name: string }[];
}

export function BulkActionsToolbar({ selectedCount, onAction, categories, authors }: BulkActionsToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <Card padding={3} shadow={1} style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--card-border-color)' }}>
      <Flex align="center" justify="space-between">
        <Text weight="semibold" size={1}>{selectedCount} stories selected</Text>
        
        <Flex gap={2} align="center">
          {/* Category */}
          <Select 
            fontSize={1} 
            onChange={e => {
              if (e.target.value) {
                onAction('category', { categoryId: e.target.value });
                e.target.value = '';
              }
            }}
          >
            <option value="">Set Category...</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </Select>

          {/* Author */}
          <Select 
            fontSize={1} 
            onChange={e => {
              if (e.target.value) {
                onAction('author', { authorId: e.target.value === 'remove' ? null : e.target.value });
                e.target.value = '';
              }
            }}
          >
            <option value="">Set Author...</option>
            <option value="remove">Remove Author</option>
            {authors.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
          </Select>

          {/* Status */}
          <Select 
            fontSize={1} 
            onChange={e => {
              if (e.target.value) {
                onAction('status', { status: e.target.value });
                e.target.value = '';
              }
            }}
          >
            <option value="">Set Status Field...</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>

          {/* Featured */}
          <Select 
            fontSize={1} 
            onChange={e => {
              if (e.target.value) {
                onAction('featured', { featured: e.target.value === 'true' });
                e.target.value = '';
              }
            }}
          >
            <option value="">Set Featured...</option>
            <option value="true">Mark as Featured</option>
            <option value="false">Remove Featured</option>
          </Select>

          <Box style={{ width: '1px', height: '24px', backgroundColor: 'var(--card-border-color)', margin: '0 8px' }} />

          <Button fontSize={1} mode="ghost" text="Publish" onClick={() => onAction('publish')} />
          <Button fontSize={1} mode="ghost" text="Unpublish" onClick={() => onAction('unpublish')} />
          
          <Button fontSize={1} tone="critical" text="Delete" onClick={() => onAction('delete')} />
        </Flex>
      </Flex>
    </Card>
  );
}
