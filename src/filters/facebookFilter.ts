/**
 * Facebook-specific content filtering implementation
 */

const FACEBOOK_POST_SELECTORS = [
  "div[role='article']",
  "div[data-type='post']",
  "div.x1yztbdb:not([role='navigation'])",
  "div.x1lliihq",
  "div.x78zum5:not([role='banner'])",
  "div.x1cy8zhl",
  "div.x9f619.x1n2onr6.x1ja2u2z:not([role='banner'])"
].join(", ");

/**
 * Hides content on Facebook that matches the provided regex pattern
 * @param termRegex - Regular expression pattern for terms to block
 */
export function hideFacebookContent(termRegex: RegExp): void {
  // Find all post containers
  const posts = document.querySelectorAll<HTMLElement>(FACEBOOK_POST_SELECTORS);
  console.log('Facebook posts found:', posts.length);
  
  posts.forEach(post => {
    const text = post.textContent?.toLowerCase() || '';
    if (termRegex.test(text)) {
      console.log('Found blocked content:', text.slice(0, 100) + '...');
      if (post.style.display !== 'none') {
        post.style.display = 'none';
        console.log('Hidden post with blocked content');
      }
    } else {
      // If the post was previously hidden but no longer matches, show it
      if (post.style.display === 'none') {
        post.style.display = '';
        console.log('Unhidden post that no longer matches block list');
      }
    }
  });
}
