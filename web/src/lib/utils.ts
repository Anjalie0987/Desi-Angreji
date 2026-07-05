import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

/**
 * Utility function to merge tailwind classes gracefully.
 * Resolves conflicts between classes like 'p-4' and 'p-2' in favor of the latter.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string (ISO) into a human readable format.
 * Defaults to 'MMM dd, yyyy' (e.g., Oct 24, 2024).
 */
export function formatDate(dateString?: string, formatStr: string = 'MMM dd, yyyy'): string {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch {
    return dateString; // fallback
  }
}

/**
 * Calculates estimated reading time based on word count.
 * Assumes 200 words per minute average reading speed.
 */
export function calculateReadingTime(text: string): number {
  if (!text) return 1;
  const wordCount = text.trim().split(/\s+/).length;
  const time = Math.ceil(wordCount / 200);
  return time > 0 ? time : 1;
}

/**
 * Truncate text to a maximum length and append ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate share links for social platforms.
 */
export function generateShareLink(platform: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin' | 'instagram', url: string, text?: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : '';
  
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}${encodedText ? `&quote=${encodedText}` : ''}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case 'whatsapp':
      return `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
    case 'instagram':
      return `https://instagram.com`;
    default:
      return url;
  }
}
