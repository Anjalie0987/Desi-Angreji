import { useState, useEffect, useRef, useMemo } from 'react';
import { useClient } from 'sanity';
import { DuplicateService } from './service';
import { ValidatedRow } from '../validation/types';

export function useDuplicateEngine(validatedRows: ValidatedRow[], mapping: Record<string, string>) {
  const client = useClient({ apiVersion: '2023-01-01' });
  const serviceRef = useRef<DuplicateService | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!serviceRef.current) {
      serviceRef.current = new DuplicateService(client);
    }
  }, [client]);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!serviceRef.current || fetched) return;
      setIsFetching(true);
      try {
        await serviceRef.current.fetchExistingStories();
        if (active) setFetched(true);
      } catch (err) {
        console.error('Failed to fetch existing stories for duplicate detection', err);
      } finally {
        if (active) setIsFetching(false);
      }
    }

    if (validatedRows.length > 0 && !fetched && !isFetching) {
      load();
    }

    return () => { active = false; };
  }, [validatedRows.length]);

  const rowsWithDuplicates = useMemo(() => {
    if (!fetched || !serviceRef.current || validatedRows.length === 0) {
      return validatedRows;
    }
    return serviceRef.current.checkDuplicates(validatedRows, mapping);
  }, [validatedRows, mapping, fetched]);

  return {
    rowsWithDuplicates,
    isCheckingDuplicates: isFetching,
  };
}
