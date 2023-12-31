export interface Post {
  profilePicUrl: string;
  username: string;
  caption: string;
  likeCount: number;
  replyCount: number;
  imageUrls: string[];
  hasImage: boolean;
  videoUrls: string[];
  hasVideo: boolean;
  attachedUrl: string;
  attachedDisplayUrl: string;
  hasAttachedUrl: boolean;
  originalWidth: number;
  originalHeight: number;
  engagement: string;
  description: string;
  url: string;
  sharedPosts: Post[];
  isQuoted: boolean;
  isRepost: boolean;
}
