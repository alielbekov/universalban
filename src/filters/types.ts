export interface ContentFilter {
  initialize(): void;
  filterContent(): void;
  updateBlockedTerms(terms: string[]): void;
}

export type Platform = 'reddit' | 'twitter' | 'youtube' | 'facebook' | 'instagram';
