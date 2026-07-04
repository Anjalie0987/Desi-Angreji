import React from 'react';
import { Card, Text, Stack, Box, Flex } from '@sanity/ui';
import { CheckmarkCircleIcon, WarningOutlineIcon, CloseCircleIcon } from '@sanity/icons';
import { ValidatedRow } from './validation/types';

interface PreviewTableProps {
  rows: ValidatedRow[];
  columns: string[];
}

export function PreviewTable({ rows, columns }: PreviewTableProps) {
  if (!columns.length) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <Text size={2} style={{ color: 'var(--card-positive-fg-color)' }}><CheckmarkCircleIcon /></Text>;
      case 'warning':
        return <Text size={2} style={{ color: 'var(--card-caution-fg-color)' }}><WarningOutlineIcon /></Text>;
      case 'invalid':
        return <Text size={2} style={{ color: 'var(--card-critical-fg-color)' }}><CloseCircleIcon /></Text>;
      default:
        return null;
    }
  };

  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Text weight="semibold" size={2}>Validation Table (Showing {rows.length} rows)</Text>
        
        <Box style={{ overflowX: 'auto', maxHeight: '500px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--card-bg-color)', zIndex: 1 }}>
              <tr style={{ borderBottom: '1px solid var(--card-border-color)' }}>
                <th style={{ padding: '8px 12px', minWidth: '60px' }}>
                  <Text weight="semibold" size={1}>Row</Text>
                </th>
                <th style={{ padding: '8px 12px', minWidth: '200px' }}>
                  <Text weight="semibold" size={1}>Title</Text>
                </th>
                <th style={{ padding: '8px 12px', minWidth: '120px' }}>
                  <Text weight="semibold" size={1}>Category</Text>
                </th>
                <th style={{ padding: '8px 12px', minWidth: '120px' }}>
                  <Text weight="semibold" size={1}>Author</Text>
                </th>
                <th style={{ padding: '8px 12px', minWidth: '100px' }}>
                  <Text weight="semibold" size={1}>Status</Text>
                </th>
                <th style={{ padding: '8px 12px', minWidth: '80px' }}>
                  <Text weight="semibold" size={1}>Image</Text>
                </th>
                <th style={{ padding: '8px 12px', minWidth: '150px' }}>
                  <Text weight="semibold" size={1}>Validation</Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const { validation, originalRow } = row;
                
                // Try to guess which column maps to which field in case it's not strictly mapped
                // The user maps these in step 1, but we don't have mapping here unless passed.
                // We will just try to find typical keys or use the first column for title, etc.
                const title = originalRow['title'] || originalRow['Title'] || originalRow[columns[0]];
                const category = originalRow['category'] || originalRow['Category'] || 'None';
                const author = originalRow['author'] || originalRow['Author'] || 'None';
                const status = originalRow['status'] || originalRow['Status'] || 'draft';
                const image = originalRow['featuredImage'] || originalRow['image'] || originalRow['Image'] || null;

                return (
                  <tr key={index} style={{ borderBottom: '1px solid var(--card-border-color)' }}>
                    <td style={{ padding: '8px 12px' }}>
                      <Text size={1} muted>{index + 1}</Text>
                    </td>
                    <td style={{ padding: '8px 12px', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <Text size={1} weight="medium">{title}</Text>
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <Text size={1}>{category}</Text>
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <Text size={1}>{author}</Text>
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <Text size={1}>{status}</Text>
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      {image ? <Text size={1} style={{ color: 'var(--card-positive-fg-color)' }}><CheckmarkCircleIcon /></Text> : <Text size={1} muted>-</Text>}
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <Flex align="center" gap={2}>
                        {getStatusIcon(validation.status)}
                        {validation.status !== 'valid' && (
                          <Text size={1} muted>{validation.errors.length} err, {validation.warnings.length} warn</Text>
                        )}
                      </Flex>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Stack>
    </Card>
  );
}
