// Get all blocked terms from storage
chrome.storage.sync.get(['platformBlocks'], (result) => {
  if (!result.platformBlocks) return;
  
  // Combine all blocked terms from all platforms
  const allBlockedTerms = Object.values(result.platformBlocks).flat();
  if (!allBlockedTerms.length) return;

  const termRegex = new RegExp(allBlockedTerms.join('|'), 'i');
  console.log('Searching for:', termRegex);

  function hideBlockedContent() {
    // Find all elements that contain text
    const elements = document.querySelectorAll<HTMLElement>('div, p, span, a, h1, h2, h3, h4, h5, h6');
    console.log('Elements:', elements.length);
    elements.forEach(element => {
      const text = element.textContent || '';
      if (termRegex.test(text)) {
        console.log('Found blocked content:', text);
        element.style.display = 'none';
      }
    });
  }

  // Initial check
  hideBlockedContent();

  // Watch for changes to the DOM
  const observer = new MutationObserver(() => {
    hideBlockedContent();
  });

  observer.observe(document.body, {
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

    const elements = document.querySelectorAll<HTMLElement>('div, p, span, a, h1, h2, h3, h4, h5, h6');
    elements.forEach(element => {
      const text = element.textContent || '';
      if (termRegex.test(text)) {
        element.style.display = 'none';
      }
    });
  }
});
