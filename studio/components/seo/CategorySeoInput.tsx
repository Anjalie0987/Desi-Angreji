import React, { useCallback, useState } from 'react';
import { ObjectInputProps, useFormValue, set } from 'sanity';
import { Box, Button, Card, Flex, Text, Dialog } from '@sanity/ui';
import { generateCategorySeo } from './seoGenerator';

export function CategorySeoInput(props: ObjectInputProps) {
  const { onChange, value } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get current category data from the document
  const categoryName = (useFormValue(['name']) as string) || '';
  const categoryDescription = (useFormValue(['description']) as string) || '';

  // Current SEO values
  const currentTitle = (value as any)?.metaTitle;
  const currentDesc = (value as any)?.metaDescription;
  const currentKeywords = (value as any)?.focusKeywords;

  const hasTitle = !!currentTitle;
  const hasDesc = !!currentDesc;
  const hasKeywords = Array.isArray(currentKeywords) && currentKeywords.length > 0;

  const allEmpty = !hasTitle && !hasDesc && !hasKeywords;
  const allFilled = hasTitle && hasDesc && hasKeywords;

  // Check if name has changed significantly (if we have a title but it doesn't contain the name)
  const isOutdated = hasTitle && categoryName && !currentTitle.toLowerCase().includes(categoryName.toLowerCase());

  const applyGeneration = useCallback(
    (forceReplace: boolean) => {
      const generated = generateCategorySeo(categoryName, categoryDescription);
      const patches = [];

      if (forceReplace || !hasTitle) {
        patches.push(set(generated.metaTitle, ['metaTitle']));
      }
      if (forceReplace || !hasDesc) {
        patches.push(set(generated.metaDescription, ['metaDescription']));
      }
      if (forceReplace || !hasKeywords) {
        patches.push(set(generated.focusKeywords, ['focusKeywords']));
      }

      if (patches.length > 0) {
        onChange(patches);
      }
    },
    [categoryName, categoryDescription, hasTitle, hasDesc, hasKeywords, onChange]
  );

  const handleGenerateClick = useCallback(() => {
    if (allEmpty) {
      // 1. All empty -> generate immediately
      applyGeneration(true);
    } else if (allFilled) {
      // 2. All filled -> show confirmation dialog
      setIsDialogOpen(true);
    } else {
      // 3. Some empty -> automatically fill only the empty fields
      applyGeneration(false);
    }
  }, [allEmpty, allFilled, applyGeneration]);

  const handleConfirmReplace = useCallback(() => {
    applyGeneration(true);
    setIsDialogOpen(false);
  }, [applyGeneration]);

  const handleCancel = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <Box>
      {/* Overwrite Protection Dialog */}
      {isDialogOpen && (
        <Dialog
          header="Replace existing SEO?"
          id="seo-replace-dialog"
          onClose={handleCancel}
          zOffset={1000}
        >
          <Box padding={4}>
            <Text>
              SEO fields already contain values. Do you want to replace the generated values?
            </Text>
            <Flex marginTop={4} gap={3} justify="flex-end">
              <Button mode="ghost" text="Cancel" onClick={handleCancel} />
              <Button tone="critical" text="Replace" onClick={handleConfirmReplace} />
            </Flex>
          </Box>
        </Dialog>
      )}

      {/* Outdated Notice */}
      {isOutdated && (
        <Card padding={3} radius={2} tone="caution" marginBottom={3}>
          <Text size={1}>
            <strong>Notice:</strong> Category name has changed. Your SEO may be outdated.
          </Text>
        </Card>
      )}

      {/* Generate Button */}
      <Box marginBottom={4}>
        <Button
          mode="ghost"
          tone="primary"
          onClick={handleGenerateClick}
          text="✨ Generate SEO"
          padding={3}
          disabled={!categoryName}
        />
      </Box>

      {/* Render Default SEO Fields */}
      {props.renderDefault(props)}
    </Box>
  );
}
