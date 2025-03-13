interface PlatformBlocks {
  [key: string]: string[];
}

const getCurrentPlatform = (): string => {
  const hostname = window.location.hostname;
  if (hostname.includes('reddit.com')) return 'reddit';
  if (hostname.includes('twitter.com')) return 'twitter';
  if (hostname.includes('youtube.com')) return 'youtube';
  if (hostname.includes('facebook.com')) return 'facebook';
  if (hostname.includes('instagram.com')) return 'instagram';
  return '';
};

const hideElement = (element: Element) => {
  element.setAttribute('style', 'display: none !important');
};

const checkAndHideContent = (platformBlocks: PlatformBlocks) => {
  const platform = getCurrentPlatform();

  console.log("Currnet Platform: ", platform);
  if (!platform || !platformBlocks[platform]) return;

  const blockedTerms = platformBlocks[platform];
  if (!blockedTerms.length) return;

  const termRegex = new RegExp(blockedTerms.join('|'), 'i');

  // Platform-specific selectors
  const selectors: { [key: string]: string } = {
    reddit: '[data-testid="post-container"], .Comment',
    twitter: '[data-testid="tweet"], [data-testid="tweetText"]',
    youtube: 'ytd-video-renderer, ytd-compact-video-renderer',
    facebook: '[role="article"]',
    instagram: 'article[role="presentation"]'
  };

  const elements = document.querySelectorAll(selectors[platform]);
  elements.forEach((element) => {
    const text = element.textContent?.toLowerCase() || '';
    if (termRegex.test(text)) {
      hideElement(element);
    }
  });
};

// Initial load
chrome.storage.sync.get(['platformBlocks'], (result) => {
  if (result.platformBlocks) {
    checkAndHideContent(result.platformBlocks);
  }
});

// Watch for changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.platformBlocks) {
    checkAndHideContent(changes.platformBlocks.newValue);
  }
});

// Watch for dynamic content
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(['platformBlocks'], (result) => {
    if (result.platformBlocks) {
      checkAndHideContent(result.platformBlocks);
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
