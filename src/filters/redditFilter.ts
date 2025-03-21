/**
 * Reddit-specific content filtering implementation
 */

/**
 * Hides content on Reddit that matches the provided regex pattern
 * @param termRegex - Regular expression pattern for terms to block
 */
export function hideRedditContent(termRegex: RegExp): void {
  // Set to help with unique item removal
  const removedPosts = new Set<HTMLElement>(); 
  
  // Find all elements that contain text
  const elements = document.querySelectorAll<HTMLElement>('div, p, span, a, h1, h2, h3, h4, h5, h6');
  console.log('Reddit elements scanned:', elements.length);
  
  elements.forEach(element => {
    const text = element.textContent?.toLocaleLowerCase() || '';
    if (termRegex.test(text)) {
      console.log('Found blocked content on Reddit:', text);
      
      // Find closest Reddit-specific containers that contain blocked terms  
      const postContainer = element.closest(
        "article, faceplate-tracker, shreddit-post, reddit-pdp-right-rail-post, shreddit-comment, search-telemetry-tracker"
      ); 

      if (postContainer && !removedPosts.has(postContainer as HTMLElement)) {
        console.log('Removed Reddit content:', postContainer);
        removedPosts.add(postContainer as HTMLElement);
        postContainer.remove();
      }
    }
  });
}
