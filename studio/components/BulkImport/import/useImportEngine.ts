import { useState, useCallback, useRef } from 'react';
import { useClient } from 'sanity';
import { ImportService } from './service';
import { ImportProgressState } from './types';
import { ValidatedRow } from '../validation/types';
import { BulkImportConfig } from '../useBulkImport';
import { ImportLogger } from '../history/logger';

const initialState: ImportProgressState = {
  status: 'idle',
  currentBatch: 0,
  totalBatches: 0,
  currentTitle: '',
  processed: 0,
  total: 0,
  estimatedRemainingMs: 0,
  summary: null,
  imagesProcessed: 0,
  imagesTotal: 0,
};

export function useImportEngine() {
  const client = useClient({ apiVersion: '2023-01-01' });
  const [progressState, setProgressState] = useState<ImportProgressState>(initialState);
  const serviceRef = useRef<ImportService | null>(null);

  const startImport = useCallback((
    rows: ValidatedRow[], 
    mapping: Record<string, string>, 
    config: BulkImportConfig,
    logger: ImportLogger
  ) => {
    setProgressState(initialState);
    
    serviceRef.current = new ImportService(client, (partialProgress) => {
      setProgressState(prev => ({ ...prev, ...partialProgress }));
    }, logger);

    serviceRef.current.execute(rows, mapping, config);
  }, [client]);

  const cancelImport = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.cancel();
    }
  }, []);

  const resetImport = useCallback(() => {
    setProgressState(initialState);
    serviceRef.current = null;
  }, []);

  return {
    progressState,
    startImport,
    cancelImport,
    resetImport,
  };
}
