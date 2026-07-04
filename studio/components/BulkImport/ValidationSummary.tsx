import React from 'react';
import { Card, Text, Stack, Grid, Box } from '@sanity/ui';

interface ValidationSummaryProps {
  stats: {
    total: number;
    valid: number;
    warning: number;
    invalid: number;
  };
}

export function ValidationSummary({ stats }: ValidationSummaryProps) {
  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Text weight="semibold" size={2}>Validation Summary</Text>
        
        <Grid columns={4} gap={3}>
          <Card padding={3} border radius={2}>
            <Text muted size={1}>Total Stories</Text>
            <Box marginTop={2}><Text weight="semibold" size={3}>{stats.total}</Text></Box>
          </Card>
          <Card padding={3} border radius={2} tone={stats.valid === stats.total ? 'positive' : 'default'}>
            <Text muted size={1}>Ready</Text>
            <Box marginTop={2}><Text weight="semibold" size={3} style={{ color: 'var(--card-fg-color)' }}>{stats.valid}</Text></Box>
          </Card>
          <Card padding={3} border radius={2} tone={stats.warning > 0 ? 'caution' : 'default'}>
            <Text muted size={1}>Warnings</Text>
            <Box marginTop={2}><Text weight="semibold" size={3} style={{ color: 'var(--card-fg-color)' }}>{stats.warning}</Text></Box>
          </Card>
          <Card padding={3} border radius={2} tone={stats.invalid > 0 ? 'critical' : 'default'}>
            <Text muted size={1}>Errors</Text>
            <Box marginTop={2}><Text weight="semibold" size={3} style={{ color: 'var(--card-fg-color)' }}>{stats.invalid}</Text></Box>
          </Card>
        </Grid>
      </Stack>
    </Card>
  );
}
