export interface GeneratedSeo {
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string[];
}

export function generateCategorySeo(name: string, description?: string): GeneratedSeo {
  if (!name) {
    return {
      metaTitle: '',
      metaDescription: '',
      focusKeywords: [],
    };
  }

  const normalizedName = name.trim();
  const lowerName = normalizedName.toLowerCase();

  // Distinguish genres vs news based on category name
  const storyGenres = ['crime', 'horror', 'suspense', 'mythology', 'history', 'inspirational'];
  const newsCategories = ['technology', 'politics', 'business', 'entertainment', 'sports', 'news', 'viral'];

  let isNews = false;
  
  // Basic heuristic: check if any news keyword matches
  if (newsCategories.some((kw) => lowerName.includes(kw))) {
    isNews = true;
  } else if (storyGenres.some((kw) => lowerName.includes(kw))) {
    isNews = false;
  } else {
    // Default to stories if indeterminate
    isNews = false;
  }

  // 1. Generate Meta Title
  const metaTitle = isNews
    ? `${normalizedName} News & Updates | Desi Angreji`
    : `${normalizedName} Stories | Desi Angreji`;

  // 2. Generate Meta Description
  let metaDescription = '';
  if (description && description.trim().length > 0) {
    let cleanDesc = description.trim();
    // Add period if missing
    if (!cleanDesc.endsWith('.')) {
      cleanDesc += '.';
    }
    metaDescription = `${cleanDesc} Read more on Desi Angreji.`;
  } else {
    metaDescription = isNews
      ? `Read the latest ${normalizedName} news and updates on Desi Angreji.`
      : `Read the latest ${normalizedName} stories and updates on Desi Angreji.`;
  }

  // 3. Generate Focus Keywords
  const focusKeywords: string[] = [];
  focusKeywords.push(normalizedName);
  
  if (isNews) {
    focusKeywords.push(`${normalizedName} News`);
    focusKeywords.push(`Latest ${normalizedName}`);
    focusKeywords.push(`${normalizedName} Updates`);
    focusKeywords.push('Desi Angreji');
    focusKeywords.push(`Breaking ${normalizedName}`);
  } else {
    focusKeywords.push(`${normalizedName} Stories`);
    focusKeywords.push(`Read ${normalizedName}`);
    focusKeywords.push(`Best ${normalizedName} Stories`);
    focusKeywords.push('Desi Angreji');
    focusKeywords.push(`${normalizedName} Tales`);
  }

  return {
    metaTitle,
    metaDescription,
    focusKeywords,
  };
}
