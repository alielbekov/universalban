import { ContentFilter } from './types';
import { BaseFilter } from './baseFilter';

export class InstagramFilter extends BaseFilter implements ContentFilter {
  initialize(): void {
    this.loadBlockedTerms('instagram');
    this.setupMutationObserver();
  }

  updateBlockedTerms(terms: string[]): void {
    this.blockedTerms = terms;
    this.filterContent();
  }

  filterContent(): void {
    if (!this.blockedTerms.length) return;

    // Filter posts in the feed
    const posts = document.querySelectorAll('article');
    posts.forEach(post => {
      const textContent = post.textContent;
      if (this.containsBlockedTerm(textContent)) {
        post.remove();
      }
    });
  }
}
