import { ContentFilter } from './types';
import { BaseFilter } from './baseFilter';

export class TwitterFilter extends BaseFilter implements ContentFilter {
  initialize(): void {
    this.loadBlockedTerms('twitter');
    this.setupMutationObserver();
  }

  updateBlockedTerms(terms: string[]): void {
    this.blockedTerms = terms;
    this.filterContent();
  }

  filterContent(): void {
    if (!this.blockedTerms.length) return;

    // Find all tweets
    const tweets = document.querySelectorAll('[data-testid="tweet"]');
    tweets.forEach(tweet => {
      const textContent = tweet.textContent;
      if (this.containsBlockedTerm(textContent)) {
        tweet.remove();
      }
    });
  }
}
