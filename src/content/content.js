// Platform detection
function getCurrentPlatform() {
  const url = window.location.hostname;
  if (url.includes('reddit.com')) return 'reddit';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('youtube.com')) return 'youtube';
  if (url.includes('facebook.com')) return 'facebook';
  if (url.includes('instagram.com')) return 'instagram';
  return null;
}

// Initialize content filtering
function initializeContentFiltering() {
  try {
    const platform = getCurrentPlatform();
    if (!platform) return; // Not a supported platform

    // Load blocked terms from storage
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      try {
        const platformBlocks = result.platformBlocks || {};
        let blockedTerms = platformBlocks[platform] || [];
        
        // Set up mutation observer for content changes
        const observer = new MutationObserver(() => {
          filterContent(blockedTerms);
        });

        // Start observing
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Initial filter
        filterContent(blockedTerms);

        // Listen for updates
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
          if (request.action === 'updateBlocks' && request.platform === platform) {
            blockedTerms = request.blockedTerms;
            filterContent(blockedTerms);
          }
        });
      } catch (err) {
        console.error('Error initializing content filtering:', err);
      }
    });
  } catch (err) {
    console.error('Error in content script:', err);
  }
}

// Filter content based on platform
function filterContent(blockedTerms) {
  if (!blockedTerms || !blockedTerms.length) return;

  try {
    const platform = getCurrentPlatform();
    if (!platform) return;

    // Get elements to check based on platform
    let elements = [];
    switch (platform) {
      case 'twitter':
        elements = document.querySelectorAll('article');
        break;
      case 'reddit':
        elements = Array.from(document.querySelectorAll('article'))
          .concat(Array.from(document.querySelectorAll('[data-testid="search-telemetry-tracker"]')));
        break;
      case 'youtube':
        elements = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer');
        break;
      case 'facebook':
        elements = document.querySelectorAll('[role="article"]');
        break;
      case 'instagram':
        elements = document.querySelectorAll('article');
        break;
    }

    // Filter elements
    elements.forEach(element => {
      try {
        const textContent = element.textContent;
        if (containsBlockedTerm(textContent, blockedTerms)) {
          element.style.display = 'none';
        }
      } catch (err) {
        console.error('Error filtering element:', err);
      }
    });
  } catch (err) {
    console.error('Error in filterContent:', err);
  }
}

// Check if text contains blocked terms
function containsBlockedTerm(text, blockedTerms) {
  if (!text || !blockedTerms) return false;
  return blockedTerms.some(term => {
    try {
      const pattern = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      return pattern.test(text);
    } catch (err) {
      console.error('Error checking blocked term:', err);
      return false;
    }
  });
}

// Start the content filtering
initializeContentFiltering();
