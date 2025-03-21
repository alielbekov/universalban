import { ContentFilter } from './types';
import { BaseFilter } from './baseFilter';

// Set to track removed posts to avoid duplicates
const removedPosts = new Set<HTMLElement>();

export function hideFacebookContent(termRegex: RegExp): void {
  // Find all feed items and posts using Facebook's specific class structure
  const feedItems = document.querySelectorAll<HTMLElement>([
    // Feed wrapper divs with specific Facebook classes
    'div.x1yztbdb div.xdj266r',
    // Common post container classes
    'div.x11i5rnm.xat24cr',
    // Content blocks
    'div.x78zum5.x1q0g3np',
    // Story/post containers
    'div.x1cy8zhl.x78zum5',
    // Comment sections
    'div.x1r8uery.x1iyjqo2'
  ].join(','));
  
  console.log('Facebook elements scanned:', feedItems.length);
  
  feedItems.forEach(item => {
    // Get text content from specific elements using Facebook's class structure
    const textElements = item.querySelectorAll<HTMLElement>([
      // Main text content
      'span.x193iq5w.xeuugli',
      // Post text
      'div.xdj266r.x11i5rnm.xat24cr',
      // Comments
      'div.x1y1aw1k div.xdj266r',
      // User names and links
      'span.x193iq5w.xeuugli.x13faqbe',
      // Blockquotes and shared content
      'blockquote.xexx8yu.x18d9i69'
    ].join(','));
    
    let hasBlockedContent = false;
    textElements.forEach(element => {
      const text = element.textContent?.toLowerCase() || '';
      if (termRegex.test(text)) {
        console.log('Found blocked content on Facebook:', text);
        hasBlockedContent = true;
      }
    });

    if (hasBlockedContent) {
      // Find the complete post container
      const postContainer = item.closest('div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r');
      if (postContainer && !removedPosts.has(postContainer as HTMLElement)) {
        console.log('Removed Facebook content:', postContainer);
        removedPosts.add(postContainer as HTMLElement);
        postContainer.remove();
      }
    }
  });
}
