// Initialize storage with empty block list
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['blockedTerms'], (result) => {
    if (!result.blockedTerms) {
      chrome.storage.sync.set({
        blockedTerms: []
      });
    }
  });
});
