import { createFilter } from '../filters/filterFactory';
import { Platform } from '../filters/types';

// Determine current platform based on URL
function getCurrentPlatform(): Platform {
  const url = window.location.hostname;
  if (url.includes('reddit.com')) return 'reddit';
  if (url.includes('twitter.com')) return 'twitter';
  if (url.includes('youtube.com')) return 'youtube';
  if (url.includes('facebook.com')) return 'facebook';
  if (url.includes('instagram.com')) return 'instagram';
  throw new Error('Unsupported platform');
}

const platform = getCurrentPlatform();
const filter = createFilter(platform);

// Initialize filter
filter.initialize();

// Listen for updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateBlocks' && request.platform === platform) {
    filter.updateBlockedTerms(request.blockedTerms);
  }
});
