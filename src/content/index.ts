import { hideRedditContent } from '../filters/redditFilter';
import { hideTwitterContent } from '../filters/twitterFilter';
import { hideFacebookContent } from '../filters/facebookFilter';

/**
 * Determines which platform filter to use based on the current URL
 * @param termRegex - Regular expression pattern for terms to block
 */
function applyPlatformFilter(termRegex: RegExp): void {
  const currentUrl = window.location.href.toLowerCase();
  
  if (currentUrl.includes('reddit.com')) {
    console.log('Applying Reddit filter');
    hideRedditContent(termRegex);
  } else if (currentUrl.includes('twitter.com') || currentUrl.includes('x.com')) {
    console.log('Applying Twitter filter');
    hideTwitterContent(termRegex);
  } else if (currentUrl.includes('facebook.com')) {
    console.log('Applying Facebook filter');
    hideFacebookContent(termRegex);
  } else {
    console.log('No specific filter for this platform');
  }
}

// Get blocked terms and apply filtering
function updateBlockedContent() {
  chrome.storage.sync.get(['platformBlocks'], (result) => {
    if (!result.platformBlocks) return;
  
    const allBlockedTerms = Object.values(result.platformBlocks).flat();
    if (!allBlockedTerms.length) return;

    const termRegex = new RegExp(allBlockedTerms.join('|'), 'i');
    console.log('Updated block list:', termRegex);
    
    // Apply the appropriate platform filter
    applyPlatformFilter(termRegex);
  });
}

// Run on load
updateBlockedContent();

const observer_var = new MutationObserver(() => {
  requestAnimationFrame(updateBlockedContent);
});

observer_var.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true
});

console.log('Observer started and scanning for dynamic changes...');

// Updates apply immediately when new block terms are added
chrome.storage.onChanged.addListener(() => {
  updateBlockedContent();
});
