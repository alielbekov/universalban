function hideBlockedContent(termRegex: RegExp) {
  // Find all elements that contain text
  // Set to help with unique item removal
  const removedPosts = new Set(); 
  const elements = document.querySelectorAll<HTMLElement>('div, p, span, a, h1, h2, h3, h4, h5, h6');
  console.log('Elements:', elements.length);
  elements.forEach(element => {
    const text = element.textContent?.toLocaleLowerCase() || '';
    if (termRegex.test(text)) {
      console.log('Found blocked content:', text);
      // Find closest article and faceplate-tracker tags that contain blocked terms  
      let postContainer = element.closest("article, faceplate-tracker, shreddit-post, reddit-pdp-right-rail-post, shreddit-comment, search-telemetry-tracker"); 

      if (postContainer&& !removedPosts.has(postContainer)) {
          console.log('Removed:', postContainer);
          removedPosts.add(postContainer);
          postContainer.remove();
      }
    }
  });
}

chrome.storage.sync.get(['platformBlocks'], (result) => {
  if (!result.platformBlocks) return;
  
  // Combine all blocked terms from all platforms
  const allBlockedTerms = Object.values(result.platformBlocks).flat();
  if (!allBlockedTerms.length) return;

  const termRegex = new RegExp(allBlockedTerms.join('|'), 'i');
  console.log('Searching for:', termRegex);

  // Initial check
  hideBlockedContent(termRegex);

  // Watch for changes to the DOM
  const observer = new MutationObserver(() => {
    hideBlockedContent(termRegex);
  });
  let targetContainer = document.querySelector('input') || document.body;
  observer.observe(targetContainer, {
    childList: true,
    subtree: true
  });
});

// Watch for changes to blocked terms
chrome.storage.onChanged.addListener((changes) => {
  if (changes.platformBlocks) {
    const allBlockedTerms = Object.values(changes.platformBlocks.newValue).flat();
    if (!allBlockedTerms.length) return;

    const termRegex = new RegExp(allBlockedTerms.join('|'), 'i');
    console.log('New terms to block:', termRegex);
    hideBlockedContent(termRegex);
  }
});
