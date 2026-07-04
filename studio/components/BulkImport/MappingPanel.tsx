import React from 'react';
import { Card, Text, Stack, Grid, Box, Select, Flex } from '@sanity/ui';
import { CheckmarkIcon } from '@sanity/icons';

interface MappingPanelProps {
  detectedColumns: string[];
  mapping: Record<string, string>;
  onMappingChange: (csvCol: string, studioField: string) => void;
}

const STUDIO_FIELDS = [
  { value: '', label: 'Select Studio Field...' },
  { value: 'title', label: 'Title' },
  { value: 'summary', label: 'Summary' },
  { value: 'content', label: 'Content' },
  { value: 'category', label: 'Category' },
  { value: 'author', label: 'Author' },
  { value: 'featuredImage', label: 'Featured Image' },
  { value: 'tags', label: 'Tags' },
  { value: 'seoTitle', label: 'SEO Title' },
];

export function MappingPanel({ detectedColumns, mapping, onMappingChange }: MappingPanelProps) {
  if (!detectedColumns.length) return null;

  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={5}>
        <Stack space={3}>
          <Text weight="semibold" size={2}>Detected Columns</Text>
          <Flex wrap="wrap" gap={3}>
            {detectedColumns.map(col => (
              <Flex key={col} align="center" gap={2}>
                <Text style={{ color: 'var(--card-positive-fg-color)' }}><CheckmarkIcon /></Text>
                <Text size={1}>{col}</Text>
              </Flex>
            ))}
          </Flex>
        </Stack>

        <Stack space={4}>
          <Stack space={3}>
            <Text weight="semibold" size={2}>Column Mapping</Text>
            <Text muted size={1}>
              The tool has automatically detected columns in your file. 
              Please map your spreadsheet columns to the corresponding Sanity Studio fields using the dropdowns below.
            </Text>
          </Stack>
          
          <Grid columns={2} gap={3} style={{ borderBottom: '1px solid var(--card-border-color)', paddingBottom: '8px' }}>
            <Text weight="medium" size={1}>CSV/Excel Column</Text>
            <Text weight="medium" size={1}>Studio Field</Text>
          </Grid>

          <Stack space={2}>
            {detectedColumns.map(col => (
              <Grid columns={2} gap={3} key={col} style={{ alignItems: 'center', backgroundColor: 'var(--card-bg-color)', padding: '12px', borderRadius: '4px', border: '1px solid var(--card-border-color)' }}>
                <Text size={1} weight="medium">{col}</Text>
                <Select 
                  value={mapping[col] || ''} 
                  onChange={(e) => onMappingChange(col, e.currentTarget.value)}
                >
                  {STUDIO_FIELDS.map(field => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </Select>
              </Grid>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
