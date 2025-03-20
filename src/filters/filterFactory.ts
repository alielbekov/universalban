import { ContentFilter, Platform } from './types';
import { RedditFilter } from './redditFilter';
import { TwitterFilter } from './twitterFilter';
import { YoutubeFilter } from './youtubeFilter';
import { FacebookFilter } from './facebookFilter';
import { InstagramFilter } from './instagramFilter';

export function createFilter(platform: Platform): ContentFilter {
  switch (platform) {
    case 'reddit':
      return new RedditFilter();
    case 'twitter':
      return new TwitterFilter();
    case 'youtube':
      return new YoutubeFilter();
    case 'facebook':
      return new FacebookFilter();
    case 'instagram':
      return new InstagramFilter();
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}
