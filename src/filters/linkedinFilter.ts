/**
 * LinkedIn-specific content filtering implementation
 */

// Set to track removed posts to avoid duplicates
const removedPosts = new Set<HTMLElement>();

export function hideLinkedInContent(termRegex: RegExp): void {
  // Find all LinkedIn post containers with urn:li:activity data-id
  const feedItems = document.querySelectorAll<HTMLElement>('div[data-id^="urn:li:activity:"]');

  console.log('LinkedIn activity posts scanned:', feedItems.length);

  feedItems.forEach(item => {
    // Get text content from specific child components
    const textElements = item.querySelectorAll<HTMLElement>([
      'span.update-components-actor__title',    // Post author
      'span.update-components-actor__description',  // Author description
      'div.update-components-text',             // Post text
      'div.feed-shared-update-v2__description', // Shared content description
      'div.feed-shared-text',                   // Another text container
      'div.comments-comment-item-content'       // Comments
    ].join(','));

    let hasBlockedContent = false;
    textElements.forEach(element => {
      const text = element.textContent?.toLowerCase() || '';
      if (termRegex.test(text)) {
        console.log('Found blocked content:', text.substring(0, 50) + '...');
        hasBlockedContent = true;
      }
    });

    if (hasBlockedContent) {
      const postId = item.getAttribute('data-id');
      console.log('Removing LinkedIn post:', postId);
      
      // Find the parent container that contains the entire post
      const postContainer = item.closest('div.relative');
      if (postContainer && !removedPosts.has(postContainer as HTMLElement)) {
        removedPosts.add(postContainer as HTMLElement);
        postContainer.remove();
      } else if (!removedPosts.has(item)) {
        // Fallback: remove the activity container itself
        removedPosts.add(item);
        item.remove();
      }
    }
  });
}