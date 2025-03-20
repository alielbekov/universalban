export abstract class BaseFilter {
  protected blockedTerms: string[] = [];

  protected containsBlockedTerm(text: string | null): boolean {
    if (!text) return false;
    return this.blockedTerms.some(term => {
      const pattern = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      return pattern.test(text);
    });
  }

  protected loadBlockedTerms(platform: string): void {
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      this.blockedTerms = platformBlocks[platform] || [];
      this.filterContent();
    });
  }

  protected setupMutationObserver(): void {
    const observer = new MutationObserver(() => this.filterContent());
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  abstract filterContent(): void;
}
