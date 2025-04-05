import { hideRedditContent } from '../filters/redditFilter';
import { hideTwitterContent } from '../filters/twitterFilter';
import { hideFacebookContent } from '../filters/facebookFilter';
import { hideYoutubeContent } from '../filters/youtubeFilter';

/**
 * Creates a word-boundary regex pattern from blocked terms
 * @param terms - Array of terms to block
 * @returns RegExp that matches whole words only
 */
function createBlockRegex(terms: string[]): RegExp {
  // Escape special regex characters and wrap each term with word boundaries
  const escapedTerms = terms.map(term => 
    `\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`
  );
  return new RegExp(escapedTerms.join('|'), 'i');
}

/**
 * Determines which platform filter to use based on the current URL
 * @param termRegex - Regular expression pattern for terms to block
 */
function applyPlatformFilter(termRegex: RegExp): void {
  const currentUrl = window.location.href.toLowerCase();
  console.log('Current URL:', currentUrl);
  
  if (currentUrl.includes('reddit.com')) {
    console.log('Applying Reddit filter');
    hideRedditContent(termRegex);
  } else if (currentUrl.includes('twitter.com') || currentUrl.includes('x.com')) {
    console.log('Applying Twitter filter');
    hideTwitterContent(termRegex);
  } else if (currentUrl.includes('facebook.com')) {
    console.log('Applying Facebook filter');
    hideFacebookContent(termRegex);
  } else if (currentUrl.includes('youtube.com')) {
    console.log('Applying Youtube filter');
    hideYoutubeContent(termRegex);
  }  else {
    console.log('No specific filter for this platform');
  }
}

// Get blocked terms and apply filtering
function updateBlockedContent() {
  console.log('Updating blocked content...');
  chrome.storage.sync.get(['blockedTerms'], (result) => {
    console.log('Retrieved blocked terms:', result.blockedTerms);
    if (!result.blockedTerms || !result.blockedTerms.length) {
      console.log('No blocked terms found');
      return;
    }
  
    const termRegex = createBlockRegex(result.blockedTerms);
    console.log('Updated block list regex:', termRegex);
    
    // Apply the appropriate platform filter
    applyPlatformFilter(termRegex);
  });
}

// Run on load
console.log('Content script loaded');
updateBlockedContent();

// Listen for storage changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedTerms) {
    console.log('Block list updated, reapplying filters...');
    updateBlockedContent();
  }
});

// Set up observer to watch for DOM changes
const observer = new MutationObserver(() => {
  requestAnimationFrame(updateBlockedContent);
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});
