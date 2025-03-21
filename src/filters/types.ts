export interface ContentFilter {
  initialize(): void;
  updateBlockedTerms(terms: string[]): void;
  filterContent(): void;
}
