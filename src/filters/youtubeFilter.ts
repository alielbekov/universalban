import { ContentFilter } from './types';
import { BaseFilter } from './baseFilter';

export class YoutubeFilter extends BaseFilter implements ContentFilter {
  initialize(): void {
    this.loadBlockedTerms('youtube');
    this.setupMutationObserver();
  }

  updateBlockedTerms(terms: string[]): void {
    this.blockedTerms = terms;
    this.filterContent();
  }

  filterContent(): void {
    if (!this.blockedTerms.length) return;

    // Filter video titles in recommendations and search results
    const videoItems = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer');
    videoItems.forEach(item => {
      const titleElement = item.querySelector('#video-title');
      if (titleElement && this.containsBlockedTerm(titleElement.textContent)) {
        item.remove();
      }
    });
  }
}
