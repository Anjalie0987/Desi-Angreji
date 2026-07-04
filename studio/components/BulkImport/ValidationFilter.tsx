import React from 'react';
import { Card, Text, Flex, Button } from '@sanity/ui';

export type FilterStatus = 'all' | 'valid' | 'warning' | 'invalid';

interface ValidationFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export function ValidationFilter({ currentFilter, onFilterChange }: ValidationFilterProps) {
  return (
    <Card padding={3} radius={2} shadow={1} border>
      <Flex align="center" gap={3}>
        <Text weight="semibold" size={1}>Filter Rows:</Text>
        <Flex gap={2}>
          <Button 
            mode={currentFilter === 'all' ? 'default' : 'ghost'} 
            text="All" 
            onClick={() => onFilterChange('all')}
            size={2}
          />
          <Button 
            mode={currentFilter === 'valid' ? 'default' : 'ghost'} 
            tone="positive"
            text="Valid" 
            onClick={() => onFilterChange('valid')}
            size={2}
          />
          <Button 
            mode={currentFilter === 'warning' ? 'default' : 'ghost'} 
            tone="caution"
            text="Warnings" 
            onClick={() => onFilterChange('warning')}
            size={2}
          />
          <Button 
            mode={currentFilter === 'invalid' ? 'default' : 'ghost'} 
            tone="critical"
            text="Invalid" 
            onClick={() => onFilterChange('invalid')}
            size={2}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
