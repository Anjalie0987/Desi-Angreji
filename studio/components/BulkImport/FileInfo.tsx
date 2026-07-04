import React from 'react';
import { Card, Text, Stack, Grid, Box } from '@sanity/ui';

interface FileInfoProps {
  info: {
    name: string;
    size: string;
    rows: number;
    cols: number;
  };
}

export function FileInfo({ info }: FileInfoProps) {
  return (
    <Card padding={4} radius={2} shadow={1} border tone="positive">
      <Stack space={4}>
        <Text weight="semibold" size={2}>File Information</Text>
        
        <Grid columns={2} gap={4}>
          <Stack space={2}>
            <Text muted size={1}>File Name</Text>
            <Text weight="medium">{info.name}</Text>
          </Stack>
          <Stack space={2}>
            <Text muted size={1}>File Size</Text>
            <Text weight="medium">{info.size}</Text>
          </Stack>
          <Stack space={2}>
            <Text muted size={1}>Total Rows</Text>
            <Text weight="medium">{info.rows}</Text>
          </Stack>
          <Stack space={2}>
            <Text muted size={1}>Detected Columns</Text>
            <Text weight="medium">{info.cols}</Text>
          </Stack>
        </Grid>
      </Stack>
    </Card>
  );
}
