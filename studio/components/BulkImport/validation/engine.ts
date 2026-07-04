import { ValidationStatus, RowValidationResult } from './types';
import { isEmpty, generateSlug, isValidUrl } from './utils';
import { VALIDATION_CONSTANTS } from './constants';
import { BulkImportConfig } from '../useBulkImport';

export function validateRow(
  row: any,
  mapping: Record<string, string>,
  config: BulkImportConfig,
  sanityCategories: {_id: string, name: string}[],
  sanityAuthors: {_id: string, name: string}[]
): RowValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let status: ValidationStatus = 'valid';

  // Helper to extract value based on Studio Field mapping
  const getValueForField = (studioField: string) => {
    const csvColumn = Object.keys(mapping).find((key) => mapping[key] === studioField);
    return csvColumn ? row[csvColumn] : undefined;
  };

  // 1. Title Validation
  const title = getValueForField('title');
  let slugPreview = '';

  if (isEmpty(title)) {
    errors.push('Title is required.');
  } else {
    const trimmedTitle = String(title).trim();
    if (trimmedTitle.length > VALIDATION_CONSTANTS.MAX_TITLE_LENGTH) {
      warnings.push(`Title exceeds maximum length of ${VALIDATION_CONSTANTS.MAX_TITLE_LENGTH} characters.`);
    }
    slugPreview = generateSlug(trimmedTitle);
  }

  // 2. Content Validation
  const content = getValueForField('content');
  if (isEmpty(content)) {
    errors.push('Content is required.');
  } else {
    const trimmedContent = String(content).trim();
    if (trimmedContent.length < VALIDATION_CONSTANTS.MIN_CONTENT_LENGTH) {
      warnings.push(`Content is shorter than ${VALIDATION_CONSTANTS.MIN_CONTENT_LENGTH} characters.`);
    }
  }

  // 3. Category Validation (Mode Dependent)
  if (config.categoryMode === 'csv') {
    const categoryName = getValueForField('category');
    if (isEmpty(categoryName)) {
      errors.push('Category is required when reading from CSV.');
    } else {
      const catStr = String(categoryName).trim();
      const mappedId = config.csvCategoryMapping[catStr];
      if (!mappedId) {
        errors.push(`Unresolved category mapping: "${catStr}"`);
      }
    }
  } else if (config.categoryMode === 'select') {
    if (isEmpty(config.categoryId)) {
      errors.push('No category selected for import.');
    }
  }

  // 3.5 Author Validation (Mode Dependent)
  if (config.authorMode === 'csv') {
    const authorName = getValueForField('author');
    if (isEmpty(authorName)) {
      errors.push('Author is required when reading from CSV.');
    } else {
      const authStr = String(authorName).trim();
      const mappedId = config.csvAuthorMapping[authStr];
      if (!mappedId) {
        errors.push(`Unresolved author mapping: "${authStr}"`);
      }
    }
  } else if (config.authorMode === 'select') {
    if (isEmpty(config.authorId)) {
      errors.push('No author selected for import.');
    }
  }

  // 4. Image URL Validation
  const featuredImage = getValueForField('featuredImage');
  if (!isEmpty(featuredImage)) {
    if (!isValidUrl(String(featuredImage))) {
      warnings.push('Image URL is not a valid HTTP/HTTPS format.');
    }
  }

  // 5. Summary Validation
  const summary = getValueForField('summary');
  if (!isEmpty(summary)) {
    const trimmedSummary = String(summary).trim();
    if (trimmedSummary.length > VALIDATION_CONSTANTS.MAX_SUMMARY_LENGTH) {
      warnings.push(`Summary exceeds maximum length of ${VALIDATION_CONSTANTS.MAX_SUMMARY_LENGTH} characters.`);
    }
  }

  // Determine final status
  if (errors.length > 0) {
    status = 'invalid';
  } else if (warnings.length > 0) {
    status = 'warning';
  }

  return {
    status,
    errors,
    warnings,
    slugPreview,
  };
}
