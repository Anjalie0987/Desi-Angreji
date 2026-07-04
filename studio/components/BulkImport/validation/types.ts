export type ValidationStatus = 'valid' | 'warning' | 'invalid';

export interface RowValidationResult {
  status: ValidationStatus;
  errors: string[];
  warnings: string[];
  slugPreview: string;
}

export type DuplicateStatus = 'new' | 'possible' | 'exact';

export interface DuplicateResult {
  status: DuplicateStatus;
  reason: string;
}

export interface ValidatedRow {
  originalRow: Record<string, any>;
  validation: RowValidationResult;
  duplicate?: DuplicateResult;
}
