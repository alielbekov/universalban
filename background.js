// Initialize default settings if needed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['blockedTerms'], (result) => {
    if (!result.blockedTerms) {
      chrome.storage.sync.set({ blockedTerms: [] });
    }
  });
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle any background tasks here
  if (request.action === 'getStats') {
    chrome.storage.sync.get(['blockedTerms'], (result) => {
      sendResponse({
        totalBlocked: result.blockedTerms?.length || 0
      });
    });
    return true; // Required for async response
  }
});
