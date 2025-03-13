// Initialize storage with empty block lists
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['platformBlocks'], (result) => {
    if (!result.platformBlocks) {
      chrome.storage.sync.set({
        platformBlocks: {
          reddit: [],
          twitter: [],
          youtube: [],
          facebook: [],
          instagram: []
        }
      });
    }
  });
});
