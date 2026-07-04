import React, { useMemo } from 'react';
import { Card, Text, Stack, Select, Box, Flex, Radio, Button, Badge } from '@sanity/ui';
import { CheckmarkCircleIcon, WarningOutlineIcon } from '@sanity/icons';
import { BulkImportConfig } from './useBulkImport';

interface StepProps {
  config: BulkImportConfig;
  onConfigChange: (key: keyof BulkImportConfig, value: any) => void;
  parsedRows: any[];
  columnMapping: Record<string, string>;
  sanityCategories: {_id: string, name: string}[];
  sanityAuthors: {_id: string, name: string}[];
}

// ----------------------------------------------------------------------
// Step 2: Category Options
// ----------------------------------------------------------------------
export function CategoryOptionsStep({ config, onConfigChange, parsedRows, columnMapping, sanityCategories }: StepProps) {
  const csvCategoryCol = Object.keys(columnMapping).find(k => columnMapping[k] === 'category');
  
  const uniqueCsvCategories = useMemo(() => {
    if (!csvCategoryCol) return [];
    const cats = new Set<string>();
    parsedRows.forEach(row => {
      const val = row[csvCategoryCol];
      if (val && String(val).trim()) cats.add(String(val).trim());
    });
    return Array.from(cats);
  }, [parsedRows, csvCategoryCol]);

  // Auto-map if not already mapped
  React.useEffect(() => {
    if (config.categoryMode === 'csv' && uniqueCsvCategories.length > 0) {
      const newMapping = { ...config.csvCategoryMapping };
      let changed = false;
      uniqueCsvCategories.forEach(csvCat => {
        if (!newMapping[csvCat]) {
          const match = sanityCategories.find(sc => sc.name.toLowerCase() === csvCat.toLowerCase());
          if (match) {
            newMapping[csvCat] = match._id;
            changed = true;
          }
        }
      });
      if (changed) onConfigChange('csvCategoryMapping', newMapping);
    }
  }, [uniqueCsvCategories, sanityCategories, config.categoryMode, config.csvCategoryMapping, onConfigChange]);

  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Text weight="semibold" size={2}>Step 2: Category Options</Text>
        
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <Radio 
              checked={config.categoryMode === 'csv'}
              onChange={() => onConfigChange('categoryMode', 'csv')}
              disabled={!csvCategoryCol}
            />
            <Text size={1}>Use Category from CSV {!csvCategoryCol && '(Map Category column first)'}</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Radio 
              checked={config.categoryMode === 'select'}
              onChange={() => onConfigChange('categoryMode', 'select')}
            />
            <Text size={1}>Assign All Stories to One Category</Text>
          </Flex>
        </Stack>

        {config.categoryMode === 'select' && (
          <Box marginTop={3} padding={3} style={{ backgroundColor: 'var(--card-bg-color)', border: '1px solid var(--card-border-color)', borderRadius: '4px' }}>
            <Select 
              value={config.categoryId} 
              onChange={(e) => onConfigChange('categoryId', e.currentTarget.value)}
            >
              <option value="">Choose a Category...</option>
              {sanityCategories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </Select>
          </Box>
        )}

        {config.categoryMode === 'csv' && csvCategoryCol && (
          <Box marginTop={3}>
            <Text weight="medium" size={1} style={{ marginBottom: '12px', display: 'block' }}>Category Validation</Text>
            <Stack space={3}>
              {uniqueCsvCategories.map(csvCat => {
                const mappedId = config.csvCategoryMapping[csvCat];
                const isCreate = mappedId === 'create';
                const matchName = isCreate ? 'Will be created automatically' : sanityCategories.find(c => c._id === mappedId)?.name;
                
                return (
                  <Flex key={csvCat} align="center" justify="space-between" padding={2} style={{ borderBottom: '1px solid var(--card-border-color)' }}>
                    <Flex align="center" gap={2}>
                      {mappedId ? (
                        <Text size={2} style={{ color: 'var(--card-positive-fg-color)' }}><CheckmarkCircleIcon /></Text>
                      ) : (
                        <Text size={2} style={{ color: 'var(--card-caution-fg-color)' }}><WarningOutlineIcon /></Text>
                      )}
                      <Text size={1} weight="medium">{csvCat}</Text>
                    </Flex>
                    
                    <Box style={{ width: '300px' }}>
                      <Select 
                        value={mappedId || ''}
                        onChange={(e) => {
                          onConfigChange('csvCategoryMapping', {
                            ...config.csvCategoryMapping,
                            [csvCat]: e.currentTarget.value
                          });
                        }}
                      >
                        <option value="">-- Action Required --</option>
                        <option value="create">Create Category Automatically</option>
                        <optgroup label="Map to Existing Category">
                          {sanityCategories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                          ))}
                        </optgroup>
                      </Select>
                    </Box>
                  </Flex>
                );
              })}
              {uniqueCsvCategories.length === 0 && (
                <Text size={1} muted>No categories found in the CSV column.</Text>
              )}
            </Stack>
          </Box>
        )}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------
// Step 3: Author Options
// ----------------------------------------------------------------------
export function AuthorOptionsStep({ config, onConfigChange, parsedRows, columnMapping, sanityAuthors }: StepProps) {
  const csvAuthorCol = Object.keys(columnMapping).find(k => columnMapping[k] === 'author');
  
  const uniqueCsvAuthors = useMemo(() => {
    if (!csvAuthorCol) return [];
    const authors = new Set<string>();
    parsedRows.forEach(row => {
      const val = row[csvAuthorCol];
      if (val && String(val).trim()) authors.add(String(val).trim());
    });
    return Array.from(authors);
  }, [parsedRows, csvAuthorCol]);

  // Auto-map if not already mapped
  React.useEffect(() => {
    if (config.authorMode === 'csv' && uniqueCsvAuthors.length > 0) {
      const newMapping = { ...config.csvAuthorMapping };
      let changed = false;
      uniqueCsvAuthors.forEach(csvAuth => {
        if (!newMapping[csvAuth]) {
          const match = sanityAuthors.find(sa => sa.name.toLowerCase() === csvAuth.toLowerCase());
          if (match) {
            newMapping[csvAuth] = match._id;
            changed = true;
          }
        }
      });
      if (changed) onConfigChange('csvAuthorMapping', newMapping);
    }
  }, [uniqueCsvAuthors, sanityAuthors, config.authorMode, config.csvAuthorMapping, onConfigChange]);

  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Text weight="semibold" size={2}>Step 3: Author Options</Text>
        
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <Radio 
              checked={config.authorMode === 'csv'}
              onChange={() => onConfigChange('authorMode', 'csv')}
              disabled={!csvAuthorCol}
            />
            <Text size={1}>Use Author from CSV {!csvAuthorCol && '(Map Author column first)'}</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Radio 
              checked={config.authorMode === 'select'}
              onChange={() => onConfigChange('authorMode', 'select')}
            />
            <Text size={1}>Assign One Author</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Radio 
              checked={config.authorMode === 'none'}
              onChange={() => onConfigChange('authorMode', 'none')}
            />
            <Text size={1}>No Author</Text>
          </Flex>
        </Stack>

        {config.authorMode === 'select' && (
          <Box marginTop={3} padding={3} style={{ backgroundColor: 'var(--card-bg-color)', border: '1px solid var(--card-border-color)', borderRadius: '4px' }}>
            <Select 
              value={config.authorId} 
              onChange={(e) => onConfigChange('authorId', e.currentTarget.value)}
            >
              <option value="">Choose an Author...</option>
              {sanityAuthors.map(author => (
                <option key={author._id} value={author._id}>{author.name}</option>
              ))}
            </Select>
          </Box>
        )}

        {config.authorMode === 'csv' && csvAuthorCol && (
          <Box marginTop={3}>
            <Text weight="medium" size={1} style={{ marginBottom: '12px', display: 'block' }}>Author Validation</Text>
            <Stack space={3}>
              {uniqueCsvAuthors.map(csvAuth => {
                const mappedId = config.csvAuthorMapping[csvAuth];
                const isCreate = mappedId === 'create';
                
                return (
                  <Flex key={csvAuth} align="center" justify="space-between" padding={2} style={{ borderBottom: '1px solid var(--card-border-color)' }}>
                    <Flex align="center" gap={2}>
                      {mappedId ? (
                        <Text size={2} style={{ color: 'var(--card-positive-fg-color)' }}><CheckmarkCircleIcon /></Text>
                      ) : (
                        <Text size={2} style={{ color: 'var(--card-caution-fg-color)' }}><WarningOutlineIcon /></Text>
                      )}
                      <Text size={1} weight="medium">{csvAuth}</Text>
                    </Flex>
                    
                    <Box style={{ width: '300px' }}>
                      <Select 
                        value={mappedId || ''}
                        onChange={(e) => {
                          onConfigChange('csvAuthorMapping', {
                            ...config.csvAuthorMapping,
                            [csvAuth]: e.currentTarget.value
                          });
                        }}
                      >
                        <option value="">-- Action Required --</option>
                        <option value="create">Create Author Automatically</option>
                        <optgroup label="Map to Existing Author">
                          {sanityAuthors.map(author => (
                            <option key={author._id} value={author._id}>{author.name}</option>
                          ))}
                        </optgroup>
                      </Select>
                    </Box>
                  </Flex>
                );
              })}
              {uniqueCsvAuthors.length === 0 && (
                <Text size={1} muted>No authors found in the CSV column.</Text>
              )}
            </Stack>
          </Box>
        )}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------
// Step 4: Publishing Options
// ----------------------------------------------------------------------
export function PublishingOptionsStep({ config, onConfigChange }: StepProps) {
  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Text weight="semibold" size={2}>Step 4: Publishing</Text>
        
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <Radio 
              checked={config.status === 'csv'}
              onChange={() => onConfigChange('status', 'csv')}
            />
            <Text size={1}>Keep CSV Status</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Radio 
              checked={config.status === 'published'}
              onChange={() => onConfigChange('status', 'published')}
            />
            <Text size={1}>Publish All</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Radio 
              checked={config.status === 'draft'}
              onChange={() => onConfigChange('status', 'draft')}
            />
            <Text size={1}>Save All as Draft</Text>
          </Flex>
        </Stack>

      </Stack>
    </Card>
  );
}
