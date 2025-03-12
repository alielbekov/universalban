let blockedTerms = [];
let currentPlatform = null;

// Detect current platform
function detectPlatform() {
  const hostname = window.location.hostname;
  if (hostname.includes('reddit.com')) return 'reddit';
  if (hostname.includes('twitter.com')) return 'twitter';
  if (hostname.includes('youtube.com')) return 'youtube';
  if (hostname.includes('facebook.com')) return 'facebook';
  if (hostname.includes('instagram.com')) return 'instagram';
  return null;
}

// Platform-specific selectors
const platformSelectors = {
  reddit: {
    post: '.Post',
    comment: '.Comment',
    username: 'a[href^="/user/"]',
    content: '.RichTextJSON-root, .Comment__body, .Post-title, .Post-content'
  },
  twitter: {
    post: '[data-testid="tweet"]',
    username: '[data-testid="User-Name"]',
    content: '[data-testid="tweetText"]'
  },
  youtube: {
    video: '.ytd-video-renderer',
    comment: 'ytd-comment-renderer',
    username: '#author-text',
    content: '#content-text'
  },
  facebook: {
    post: '[role="article"]',
    username: '.x1heor9g',
    content: '.xdj266r'
  },
  instagram: {
    post: 'article',
    username: '._aacl._aacs._aact',
    content: '._a9zs'
  }
};

// Load blocked terms for current platform
function loadBlockedTerms() {
  currentPlatform = detectPlatform();
  if (!currentPlatform) return;

  chrome.storage.sync.get(['platformBlocks'], (result) => {
    const platformBlocks = result.platformBlocks || {};
    blockedTerms = platformBlocks[currentPlatform] || [];
    filterContent();
  });
}

// Listen for updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateBlocks' && request.platform === currentPlatform) {
    blockedTerms = request.blockedTerms;
    filterContent();
  }
});

// Create an observer to watch for DOM changes
const observer = new MutationObserver((mutations) => {
  if (currentPlatform) filterContent();
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true
});

function filterContent() {
  if (!currentPlatform || !blockedTerms.length) return;

  const selectors = platformSelectors[currentPlatform];
  if (!selectors) return;

  // Convert blocked terms to case-insensitive regex patterns
  const patterns = blockedTerms.map(term => 
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  );

  // Function to check if text contains any blocked terms
  const containsBlockedTerm = (text) => {
    return patterns.some(pattern => pattern.test(text));
  };

  // Platform-specific filtering
  switch (currentPlatform) {
    case 'reddit':
      filterRedditContent(selectors, containsBlockedTerm);
      break;
    case 'twitter':
      filterTwitterContent(selectors, containsBlockedTerm);
      break;
    case 'youtube':
      filterYouTubeContent(selectors, containsBlockedTerm);
      break;
    case 'facebook':
      filterFacebookContent(selectors, containsBlockedTerm);
      break;
    case 'instagram':
      filterInstagramContent(selectors, containsBlockedTerm);
      break;
  }
}

function filterRedditContent(selectors, containsBlockedTerm) {
  // Filter posts
  document.querySelectorAll(selectors.post).forEach(post => {
    const title = post.querySelector(selectors.content);
    if (title && containsBlockedTerm(title.textContent)) {
      post.style.display = 'none';
    }
  });

  // Filter comments
  document.querySelectorAll(selectors.comment).forEach(comment => {
    const content = comment.querySelector(selectors.content);
    if (content && containsBlockedTerm(content.textContent)) {
      comment.style.display = 'none';
    }
  });

  // Filter usernames
  document.querySelectorAll(selectors.username).forEach(username => {
    if (containsBlockedTerm(username.textContent)) {
      const parentPost = username.closest(selectors.post) || username.closest(selectors.comment);
      if (parentPost) parentPost.style.display = 'none';
    }
  });
}

function filterTwitterContent(selectors, containsBlockedTerm) {
  document.querySelectorAll(selectors.post).forEach(tweet => {
    const content = tweet.querySelector(selectors.content);
    const username = tweet.querySelector(selectors.username);
    
    if ((content && containsBlockedTerm(content.textContent)) ||
        (username && containsBlockedTerm(username.textContent))) {
      tweet.style.display = 'none';
    }
  });
}

function filterYouTubeContent(selectors, containsBlockedTerm) {
  // Filter videos
  document.querySelectorAll(selectors.video).forEach(video => {
    const content = video.querySelector(selectors.content);
    const username = video.querySelector(selectors.username);
    
    if ((content && containsBlockedTerm(content.textContent)) ||
        (username && containsBlockedTerm(username.textContent))) {
      video.style.display = 'none';
    }
  });

  // Filter comments
  document.querySelectorAll(selectors.comment).forEach(comment => {
    const content = comment.querySelector(selectors.content);
    if (content && containsBlockedTerm(content.textContent)) {
      comment.style.display = 'none';
    }
  });
}

function filterFacebookContent(selectors, containsBlockedTerm) {
  document.querySelectorAll(selectors.post).forEach(post => {
    const content = post.querySelector(selectors.content);
    const username = post.querySelector(selectors.username);
    
    if ((content && containsBlockedTerm(content.textContent)) ||
        (username && containsBlockedTerm(username.textContent))) {
      post.style.display = 'none';
    }
  });
}

function filterInstagramContent(selectors, containsBlockedTerm) {
  document.querySelectorAll(selectors.post).forEach(post => {
    const content = post.querySelector(selectors.content);
    const username = post.querySelector(selectors.username);
    
    if ((content && containsBlockedTerm(content.textContent)) ||
        (username && containsBlockedTerm(username.textContent))) {
      post.style.display = 'none';
    }
  });
}

// Initialize when content script loads
loadBlockedTerms();
