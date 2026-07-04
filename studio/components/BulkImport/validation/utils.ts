export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  return false;
}

export function generateSlug(title: string): string {
  if (!title || typeof title !== 'string') return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const pattern = /^https?:\/\//i;
  return pattern.test(url.trim());
}
