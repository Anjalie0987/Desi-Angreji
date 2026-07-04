import React from 'react';
import { Card, Text, Stack, Button, Flex, Box } from '@sanity/ui';
import { ImportProgressState } from './types';

interface ImportProgressProps {
  progress: ImportProgressState;
  onCancel: () => void;
}

export function ImportProgress({ progress, onCancel }: ImportProgressProps) {
  const percentage = progress.total > 0 ? Math.round((progress.processed / progress.total) * 100) : 0;
  
  const formatTime = (ms: number) => {
    if (ms === 0) return 'Calculating...';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    if (minutes > 0) return `${minutes}m ${remainSeconds}s`;
    return `${seconds}s`;
  };

  const drawProgressBar = (percent: number) => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Text weight="semibold" size={3}>Importing...</Text>
        
        <Flex justify="space-between">
          <Text weight="medium">Story {progress.processed} / {progress.total}</Text>
          <Text weight="medium">{percentage}%</Text>
        </Flex>

        <Box>
          <Text size={2} style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>
            {drawProgressBar(percentage)}
          </Text>
        </Box>

        <Stack space={2}>
          <Text size={1} muted>Estimated remaining time: {formatTime(progress.estimatedRemainingMs)}</Text>
          <Text size={1} muted>Current batch: {progress.currentBatch} / {progress.totalBatches}</Text>
          <Text size={1} muted>Processing: {progress.currentTitle || '...'}</Text>
          
          {progress.imagePhase && (
            <Box marginTop={3} padding={3} style={{ backgroundColor: 'var(--card-bg-color)', borderLeft: '3px solid var(--card-focus-ring-color)' }}>
              <Stack space={2}>
                <Flex justify="space-between">
                  <Text size={1} weight="semibold" style={{ color: 'var(--card-focus-ring-color)' }}>{progress.imagePhase}</Text>
                  <Text size={1} muted>{progress.imagesProcessed} / {progress.imagesTotal} Images</Text>
                </Flex>
                {progress.currentImage && (
                  <Text size={1} muted style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {progress.currentImage}
                  </Text>
                )}
              </Stack>
            </Box>
          )}
        </Stack>

        <Flex justify="flex-end" marginTop={3}>
          <Button 
            tone="critical" 
            mode="ghost" 
            text="Cancel Import" 
            onClick={onCancel} 
          />
        </Flex>
      </Stack>
    </Card>
  );
}
