import React from 'react';
import { Card, Text, Stack, Grid, Box, Button, Flex } from '@sanity/ui';
import { ImportSummaryStats } from './types';

interface ImportSummaryProps {
  stats: ImportSummaryStats;
  isCanceled: boolean;
  onReset: () => void;
}

export function ImportSummary({ stats, isCanceled, onReset }: ImportSummaryProps) {
  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    if (m > 0) return `${m}m ${rem}s`;
    return `${s}s`;
  };

  return (
    <Card padding={4} radius={2} shadow={1} border tone={isCanceled ? 'caution' : 'positive'}>
      <Stack space={4}>
        <Text weight="semibold" size={3}>
          {isCanceled ? 'Import Canceled' : 'Import Complete'}
        </Text>
        
        <Grid columns={4} gap={4}>
          <Box>
            <Text muted size={1}>Stories Imported</Text>
            <Box marginTop={2}><Text weight="semibold" size={4} style={{ color: 'var(--card-positive-fg-color)' }}>{stats.imported}</Text></Box>
          </Box>
          <Box>
            <Text muted size={1}>Stories Failed</Text>
            <Box marginTop={2}><Text weight="semibold" size={4} style={{ color: 'var(--card-critical-fg-color)' }}>{stats.failed}</Text></Box>
          </Box>
          <Box>
            <Text muted size={1}>Warnings</Text>
            <Box marginTop={2}><Text weight="semibold" size={4} style={{ color: 'var(--card-caution-fg-color)' }}>{stats.skipped + stats.exactSkipped}</Text></Box>
          </Box>
          <Box>
            <Text muted size={1}>Time Taken</Text>
            <Box marginTop={2}><Text weight="semibold" size={4}>{formatDuration(stats.durationMs)}</Text></Box>
          </Box>
        </Grid>

        {stats.imagesProcessed > 0 && (
          <>
            <Box style={{ borderTop: '1px solid var(--card-border-color)', margin: '16px 0' }} />
            <Text weight="semibold" size={2}>Image Processing Summary</Text>
            <Grid columns={4} gap={4}>
              <Box>
                <Text muted size={1}>Images Processed</Text>
                <Box marginTop={2}><Text weight="semibold" size={3}>{stats.imagesProcessed}</Text></Box>
              </Box>
              <Box>
                <Text muted size={1}>Images Uploaded</Text>
                <Box marginTop={2}><Text weight="semibold" size={3} style={{ color: 'var(--card-positive-fg-color)' }}>{stats.imagesUploaded}</Text></Box>
              </Box>
              <Box>
                <Text muted size={1}>Images Reused</Text>
                <Box marginTop={2}><Text weight="semibold" size={3} style={{ color: 'var(--card-focus-ring-color)' }}>{stats.imagesReused}</Text></Box>
              </Box>
              <Box>
                <Text muted size={1}>Images Failed</Text>
                <Box marginTop={2}><Text weight="semibold" size={3} style={{ color: 'var(--card-critical-fg-color)' }}>{stats.imagesFailed}</Text></Box>
              </Box>
            </Grid>
          </>
        )}

        <Flex justify="flex-end" gap={3} marginTop={4}>
          <Button 
            mode="ghost"
            text="View Import History" 
            onClick={() => window.location.hash = '/import-history'}
          />
          <Button 
            tone="primary" 
            text="Import More Stories" 
            onClick={onReset} 
          />
        </Flex>
      </Stack>
    </Card>
  );
}
