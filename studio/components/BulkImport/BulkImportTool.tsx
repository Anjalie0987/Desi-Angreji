import React, { useState, useMemo } from 'react';
import { Box, Container, Stack, Heading, Button, Flex, Text } from '@sanity/ui';
import { useBulkImport, BulkImportConfig } from './useBulkImport';
import { FileUploader } from './FileUploader';
import { FileInfo } from './FileInfo';
import { MappingPanel } from './MappingPanel';
import { CategoryOptionsStep, AuthorOptionsStep, PublishingOptionsStep } from './WizardSteps';
import { PreviewTable } from './PreviewTable';
import { ValidationSummary } from './ValidationSummary';
import { useImportEngine } from './import/useImportEngine';
import { ImportProgress } from './import/ImportProgress';
import { ImportSummary } from './import/ImportSummary';
import { useDuplicateEngine } from './duplicates/useDuplicateEngine';
import { ImportLogger } from './history/logger';
import { useClient } from 'sanity';

export function BulkImportTool() {
  const client = useClient({ apiVersion: '2023-01-01' });
  const {
    file,
    fileInfo,
    parsedRows,
    detectedColumns,
    columnMapping,
    setColumnMapping,
    config,
    setConfig,
    handleFileUpload,
    reset,
    validatedRows,
    validationStats,
    sanityCategories,
    sanityAuthors,
  } = useBulkImport();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const { progressState, startImport, cancelImport, resetImport } = useImportEngine();
  const { rowsWithDuplicates, isCheckingDuplicates } = useDuplicateEngine(validatedRows, columnMapping);

  const handleMappingChange = (csvCol: string, studioField: string) => {
    setColumnMapping(prev => ({ ...prev, [csvCol]: studioField }));
  };

  const handleConfigChange = (key: keyof BulkImportConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (parsedRows.length > 150) {
      alert(`This file contains ${parsedRows.length} stories.\n\nThe current maximum supported import size is 150 stories per import.\n\nPlease split the file into smaller batches.`);
      return;
    }

    const logger = new ImportLogger(client, file?.name || 'unknown');
    logger.logEvent('Validation Started');
    logger.logEvent('Validation Completed');

    startImport(rowsWithDuplicates, columnMapping, config, logger);
  };

  const handleFullReset = () => {
    reset();
    resetImport();
    setCurrentStep(1);
  };



  const hasInvalidRows = validationStats.invalid > 0;

  return (
    <Box padding={4} paddingY={5}>
      <Container width={3}>
        <Stack space={5}>

          {progressState.status === 'importing' && (
            <ImportProgress progress={progressState} onCancel={cancelImport} />
          )}

          {(progressState.status === 'completed' || progressState.status === 'canceled') && progressState.summary && (
            <ImportSummary stats={progressState.summary} isCanceled={progressState.status === 'canceled'} onReset={handleFullReset} />
          )}

          {progressState.status === 'idle' && (
            <>
              {currentStep === 1 && (
                <Stack space={4}>
                  {!file ? (
                    <FileUploader onFileSelect={handleFileUpload} />
                  ) : !fileInfo ? (
                    <Box padding={4}><Text muted>Analyzing file...</Text></Box>
                  ) : (
                    <>
                      <FileInfo info={fileInfo} />
                      <MappingPanel 
                        detectedColumns={detectedColumns}
                        mapping={columnMapping}
                        onMappingChange={handleMappingChange}
                      />
                    </>
                  )}
                  <Flex justify="flex-end" gap={3}>
                    {file && (
                      <Button tone="primary" text="Next Step" onClick={() => setCurrentStep(2)} />
                    )}
                  </Flex>
                </Stack>
              )}

              {currentStep === 2 && (
                <Stack space={4}>
                  <CategoryOptionsStep 
                    config={config} 
                    onConfigChange={handleConfigChange} 
                    parsedRows={parsedRows} 
                    columnMapping={columnMapping} 
                    sanityCategories={sanityCategories}
                    sanityAuthors={sanityAuthors}
                  />
                  <Flex justify="space-between">
                    <Button mode="ghost" text="Back" onClick={() => setCurrentStep(1)} />
                    <Button tone="primary" text="Next Step" onClick={() => setCurrentStep(3)} disabled={config.categoryMode === 'csv' && Object.values(config.csvCategoryMapping).some(v => !v) || config.categoryMode === 'select' && !config.categoryId} />
                  </Flex>
                </Stack>
              )}

              {currentStep === 3 && (
                <Stack space={4}>
                  <AuthorOptionsStep 
                    config={config} 
                    onConfigChange={handleConfigChange} 
                    parsedRows={parsedRows} 
                    columnMapping={columnMapping} 
                    sanityCategories={sanityCategories}
                    sanityAuthors={sanityAuthors}
                  />
                  <Flex justify="space-between">
                    <Button mode="ghost" text="Back" onClick={() => setCurrentStep(2)} />
                    <Button tone="primary" text="Next Step" onClick={() => setCurrentStep(4)} disabled={config.authorMode === 'csv' && Object.values(config.csvAuthorMapping).some(v => !v) || config.authorMode === 'select' && !config.authorId} />
                  </Flex>
                </Stack>
              )}

              {currentStep === 4 && (
                <Stack space={4}>
                  <PublishingOptionsStep 
                    config={config} 
                    onConfigChange={handleConfigChange} 
                    parsedRows={parsedRows} 
                    columnMapping={columnMapping} 
                    sanityCategories={sanityCategories}
                    sanityAuthors={sanityAuthors}
                  />
                  <Flex justify="space-between">
                    <Button mode="ghost" text="Back" onClick={() => setCurrentStep(3)} />
                    <Button tone="primary" text="Next Step" onClick={() => setCurrentStep(5)} />
                  </Flex>
                </Stack>
              )}

              {currentStep === 5 && (
                <Stack space={4}>
                  <ValidationSummary stats={validationStats} />
                  <PreviewTable rows={rowsWithDuplicates} columns={detectedColumns} />
                  
                  <Flex justify="space-between" marginTop={3}>
                    <Button mode="ghost" text="Back" onClick={() => setCurrentStep(4)} />
                    <Flex gap={3}>
                      <Button mode="ghost" text="Reset Completely" onClick={handleFullReset} tone="critical" />
                      <Button 
                        tone="primary" 
                        text={isCheckingDuplicates ? "Checking Duplicates..." : "Import Stories"}
                        onClick={handleNext}
                        disabled={hasInvalidRows || isCheckingDuplicates}
                      />
                    </Flex>
                  </Flex>
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
