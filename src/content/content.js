let blockedTerms = [];

// Load blocked terms from storage
function loadBlockedTerms() {
  chrome.storage.sync.get(['platformBlocks'], (result) => {
    const platformBlocks = result.platformBlocks || {};
    blockedTerms = platformBlocks['reddit'] || [];
    filterRedditContent();
  });
}

// Listen for updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateBlocks' && request.platform === 'reddit') {
    blockedTerms = request.blockedTerms;
    filterRedditContent();
  }
});

// Create an observer to watch for DOM changes
const observer = new MutationObserver(() => {
  filterRedditContent();
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true
});

function containsBlockedTerm(text) {
  if (!text) return false;
  return blockedTerms.some(term => {
    const pattern = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return pattern.test(text);
  });
}

function filterRedditContent() {
  if (!blockedTerms.length) return;

  // Find all articles and search-telemetry-tracker elements
  const articles = document.querySelectorAll('article');
  console.log(articles);
  
  const telemetryTrackers = document.querySelectorAll('[data-testid="search-telemetry-tracker"]');

  // Process articles
  articles.forEach(article => {
    const textContent = article.textContent;
    if (containsBlockedTerm(textContent)) {
      article.remove();
    }
  });

  // Process search telemetry trackers
  telemetryTrackers.forEach(tracker => {
    const textContent = tracker.textContent;
    if (containsBlockedTerm(textContent)) {
      tracker.remove();
    }
  });
}

// Initialize when content script loads
loadBlockedTerms();
