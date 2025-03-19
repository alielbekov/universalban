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

// Get blocked terms and apply filtering
function updateBlockedContent() {
  chrome.storage.sync.get(['platformBlocks'], (result) => {
    if (!result.platformBlocks) return;
  
    const allBlockedTerms = Object.values(result.platformBlocks).flat();
    if (!allBlockedTerms.length) return;

    const termRegex = new RegExp(allBlockedTerms.join('|'), 'i');
    console.log('Updated block list:', termRegex);
    
    hideBlockedContent(termRegex);
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
