import { ContentFilter } from './types';
import { BaseFilter } from './baseFilter';

export class RedditFilter extends BaseFilter implements ContentFilter {
  initialize(): void {
    this.loadBlockedTerms('reddit');
    this.setupMutationObserver();
  }

  updateBlockedTerms(terms: string[]): void {
    this.blockedTerms = terms;
    this.filterContent();
  }

  filterContent(): void {
    if (!this.blockedTerms.length) return;

    // Find all articles and search-telemetry-tracker elements
    const articles = document.querySelectorAll('article');
    const telemetryTrackers = document.querySelectorAll('[data-testid="search-telemetry-tracker"]');

    // Process articles
    articles.forEach(article => {
      const textContent = article.textContent;
      if (this.containsBlockedTerm(textContent)) {
        article.remove();
      }
    });

    // Process search telemetry trackers
    telemetryTrackers.forEach(tracker => {
      const textContent = tracker.textContent;
      if (this.containsBlockedTerm(textContent)) {
        tracker.remove();
      }
    });
  }
}
