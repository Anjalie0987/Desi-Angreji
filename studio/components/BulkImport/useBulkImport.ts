import { useState, useMemo, useRef, useEffect } from 'react';
import { useClient } from 'sanity';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { validateRow } from './validation/engine';
import { ValidatedRow } from './validation/types';

export type CategoryMode = 'csv' | 'select';
export type AuthorMode = 'none' | 'csv' | 'select';

export interface BulkImportConfig {
  categoryMode: CategoryMode;
  categoryId: string;
  csvCategoryMapping: Record<string, string>; // mapping from raw CSV string -> Sanity ID or 'create'
  authorMode: AuthorMode;
  authorId: string;
  csvAuthorMapping: Record<string, string>; // mapping from raw CSV string -> Sanity ID or 'create'
  status: 'csv' | 'draft' | 'published';
  language: 'english' | 'hindi' | 'both';
  exactDuplicateAction: 'skip' | 'import';
  possibleDuplicateAction: 'warn' | 'skip';
}

export function useBulkImport() {
  const client = useClient({ apiVersion: '2023-01-01' });
  const [sanityCategories, setSanityCategories] = useState<{_id: string, name: string}[]>([]);
  const [sanityAuthors, setSanityAuthors] = useState<{_id: string, name: string}[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "category" && !(_id in path("drafts.**"))]{_id, name}`).then(setSanityCategories);
    client.fetch(`*[_type == "author" && !(_id in path("drafts.**"))]{_id, name}`).then(setSanityAuthors);
  }, [client]);

  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string; rows: number; cols: number } | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [detectedColumns, setDetectedColumns] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [config, setConfig] = useState<BulkImportConfig>({
    categoryMode: 'csv',
    categoryId: '',
    csvCategoryMapping: {},
    authorMode: 'none',
    authorId: '',
    csvAuthorMapping: {},
    status: 'csv',
    language: 'english',
    exactDuplicateAction: 'skip',
    possibleDuplicateAction: 'warn',
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    
    const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'csv') {
      Papa.parse(uploadedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data as any[];
          const columns = results.meta.fields || [];
          
          setParsedRows(rows);
          setDetectedColumns(columns);
          setFileInfo({
            name: uploadedFile.name,
            size: formatFileSize(uploadedFile.size),
            rows: rows.length,
            cols: columns.length,
          });
          
          const initialMapping: Record<string, string> = {};
          columns.forEach(col => {
            initialMapping[col] = '';
          });
          setColumnMapping(initialMapping);
        }
      });
    } else if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet) as any[];
        
        if (rows.length > 0) {
          const columnsSet = new Set<string>();
          rows.forEach(row => Object.keys(row).forEach(key => columnsSet.add(key)));
          const columns = Array.from(columnsSet);

          setParsedRows(rows);
          setDetectedColumns(columns);
          setFileInfo({
            name: uploadedFile.name,
            size: formatFileSize(uploadedFile.size),
            rows: rows.length,
            cols: columns.length,
          });
          
          const initialMapping: Record<string, string> = {};
          columns.forEach(col => {
            initialMapping[col] = '';
          });
          setColumnMapping(initialMapping);
        }
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  const reset = () => {
    setFile(null);
    setFileInfo(null);
    setParsedRows([]);
    setDetectedColumns([]);
    setColumnMapping({});
    setConfig({
      categoryMode: 'csv',
      categoryId: '',
      csvCategoryMapping: {},
      authorMode: 'none',
      authorId: '',
      csvAuthorMapping: {},
      status: 'csv',
      language: 'english',
      exactDuplicateAction: 'skip',
      possibleDuplicateAction: 'warn',
    });
  };

  const validatedRows: ValidatedRow[] = useMemo(() => {
    if (parsedRows.length === 0) return [];
    return parsedRows.map((row) => ({
      originalRow: row,
      validation: validateRow(row, columnMapping, config, sanityCategories, sanityAuthors),
    }));
  }, [parsedRows, columnMapping, config, sanityCategories, sanityAuthors]);

  const validationStats = useMemo(() => {
    const total = validatedRows.length;
    let valid = 0;
    let warning = 0;
    let invalid = 0;
    validatedRows.forEach((row) => {
      if (row.validation.status === 'valid') valid++;
      else if (row.validation.status === 'warning') warning++;
      else if (row.validation.status === 'invalid') invalid++;
    });
    return { total, valid, warning, invalid };
  }, [validatedRows]);

  return {
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
  };
}
