/**
 * Youtube-specific content filtering implementation
 */

/**
 * Hides content on Youtube that matches the provided regex pattern
 * @param termRegex - Regular expression pattern for terms to block
 */
export function hideYoutubeContent(termRegex: RegExp): void {
    // Set to help with unique item removal
    const removedEl = new Set<HTMLElement>(); 
    
    // Find all elements that contain text
    const elements = document.querySelectorAll<HTMLElement>('div, p, span, a, h1, h2, h3, h4, h5, h6');
    
    elements.forEach(element => {
      const text = element.textContent?.toLocaleLowerCase() || '';
      if (termRegex.test(text)) {
        console.log('Found blocked content on Youtube:', text);
        
        // Find closest Youtube-specific containers that contain blocked terms  
        const postContainer = element.closest(
            "ytd-video-renderer, ytd-grid-video-renderer, ytd-radio-renderer, ytd-search-refinement-card-renderer, \
            ytd-channel-video-player-renderer, yt-lockup-view-model,  ytd-post-renderer, ytd-playlist-panel-video-renderer,  \
            ytd-channel-renderer, ytd-rich-item-renderer, ytd-reel-video-renderer, ytd-comment-view-model,  \
            ytd-compact-video-renderer, ytm-shorts-lockup-view-model-v2, ytd-watch-card-compact-video-renderer, div#player"
          );
  
          if (postContainer && !removedEl.has(postContainer as HTMLElement)) {
            removedEl.add(postContainer as HTMLElement);
            console.log("Removed Youtube content:", postContainer);
            postContainer.remove();
          }
      }
    });
  }