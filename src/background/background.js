// Background script mainly handles extension initialization
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage with empty block lists
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
