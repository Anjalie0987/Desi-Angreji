import React from 'react';
import { Card, Text, Stack, Select, Box, Grid, Flex, Radio } from '@sanity/ui';
import { BulkImportConfig } from './useBulkImport';

interface ConfigurationPanelProps {
  config: BulkImportConfig;
  onConfigChange: (key: keyof BulkImportConfig, value: string) => void;
}

// Temporary Mock Data
const MOCK_CATEGORIES = [
  { id: 'cat-1', title: 'Crime' },
  { id: 'cat-2', title: 'Suspense' },
  { id: 'cat-3', title: 'Horror' },
];

const MOCK_AUTHORS = [
  { id: 'auth-1', name: 'John Doe' },
  { id: 'auth-2', name: 'Jane Smith' },
];

export function ConfigurationPanel({ config, onConfigChange }: ConfigurationPanelProps) {
  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Text weight="semibold" size={2}>Import Configuration</Text>
        
        <Box>
          <Text weight="medium" size={1} style={{ marginBottom: '8px', display: 'block' }}>Category Mode</Text>
          <Select 
            value={config.categoryMode} 
            onChange={(e) => onConfigChange('categoryMode', e.currentTarget.value)}
          >
            <option value="csv">Use Category from CSV</option>
            <option value="select">Select One Category</option>
          </Select>
          
          {config.categoryMode === 'select' && (
            <Box marginTop={3}>
              <Select 
                value={config.categoryId} 
                onChange={(e) => onConfigChange('categoryId', e.currentTarget.value)}
              >
                <option value="">Choose a Category...</option>
                {MOCK_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </Select>
            </Box>
          )}
        </Box>

        <Box>
          <Text weight="medium" size={1} style={{ marginBottom: '8px', display: 'block' }}>Author Mode</Text>
          <Select 
            value={config.authorMode} 
            onChange={(e) => onConfigChange('authorMode', e.currentTarget.value)}
          >
            <option value="none">No Author</option>
            <option value="csv">Use Author from CSV</option>
            <option value="select">Select One Author</option>
          </Select>

          {config.authorMode === 'select' && (
            <Box marginTop={3}>
              <Select 
                value={config.authorId} 
                onChange={(e) => onConfigChange('authorId', e.currentTarget.value)}
              >
                <option value="">Choose an Author...</option>
                {MOCK_AUTHORS.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </Select>
            </Box>
          )}
        </Box>

        <Box>
          <Text weight="medium" size={1} style={{ marginBottom: '8px', display: 'block' }}>Status</Text>
          <Select 
            value={config.status} 
            onChange={(e) => onConfigChange('status', e.currentTarget.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Box>

        <Box>
          <Text weight="medium" size={1} style={{ marginBottom: '8px', display: 'block' }}>Language</Text>
          <Select 
            value={config.language} 
            onChange={(e) => onConfigChange('language', e.currentTarget.value)}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="both">Both</option>
          </Select>
        </Box>

        <Box marginTop={4} style={{ borderTop: '1px solid var(--card-border-color)' }} paddingTop={4}>
          <Box marginBottom={3}><Text weight="semibold" size={2}>Duplicate Resolution</Text></Box>
          <Grid columns={2} gap={4}>
            <Box>
              <Box marginBottom={2}><Text weight="medium" size={1}>Exact Duplicates (Slug matches)</Text></Box>
              <Stack space={2} marginTop={3}>
                <Flex align="center" gap={2}>
                  <Radio 
                    checked={config.exactDuplicateAction === 'skip'}
                    onChange={() => onConfigChange('exactDuplicateAction', 'skip')}
                  />
                  <Text size={1}>Skip Duplicate Stories (Default)</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Radio 
                    checked={config.exactDuplicateAction === 'import'}
                    onChange={() => onConfigChange('exactDuplicateAction', 'import')}
                  />
                  <Text size={1}>Import Anyway</Text>
                </Flex>
              </Stack>
            </Box>

            <Box>
              <Box marginBottom={2}><Text weight="medium" size={1}>Possible Duplicates (Title matches)</Text></Box>
              <Stack space={2} marginTop={3}>
                <Flex align="center" gap={2}>
                  <Radio 
                    checked={config.possibleDuplicateAction === 'warn'}
                    onChange={() => onConfigChange('possibleDuplicateAction', 'warn')}
                  />
                  <Text size={1}>Show Warning Only (Default)</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Radio 
                    checked={config.possibleDuplicateAction === 'skip'}
                    onChange={() => onConfigChange('possibleDuplicateAction', 'skip')}
                  />
                  <Text size={1}>Skip</Text>
                </Flex>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Stack>
    </Card>
  );
}
