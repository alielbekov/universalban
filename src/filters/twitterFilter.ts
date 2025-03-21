/**
 * Twitter-specific content filtering implementation
 */

/**
 * Hides content on Twitter that matches the provided regex pattern
 * @param termRegex - Regular expression pattern for terms to block
 */
export function hideTwitterContent(termRegex: RegExp): void {
  // Set to help with unique item removal
  const removedPosts = new Set<HTMLElement>(); 
  
  // Find all elements that contain text
  const elements = document.querySelectorAll<HTMLElement>('div, p, span, a, h1, h2, h3, h4, h5, h6');
  console.log('Twitter elements scanned:', elements.length);
  
  elements.forEach(element => {
    const text = element.textContent?.toLocaleLowerCase() || '';
    if (termRegex.test(text)) {
      console.log('Found blocked content on Twitter:', text);
      
      // Find closest Twitter-specific containers that contain blocked terms
      // Twitter uses data-testid attributes for many components
      const postContainer = element.closest(
        "[data-testid='tweet'], [data-testid='tweetDetail'], article"
      ); 

      if (postContainer && !removedPosts.has(postContainer as HTMLElement)) {
        console.log('Removed Twitter content:', postContainer);
        removedPosts.add(postContainer as HTMLElement);
        postContainer.remove();
      }
    }
  });
}
