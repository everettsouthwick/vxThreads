import { Constants } from "../constants/constants";
import { ProxyManager } from "../managers/proxyManager";
import { Post } from "../models/post";
import { User } from "../models/user";

export function buildPostMetadata(post: Post): string[] {
  const metadata: string[] = [];

  metadata.push(...buildDefaultPostMetadata(post));

  if (post.hasVideo) {
    metadata.push(...buildVideoPostMetadata(post));
  } else if (post.hasImage) {
    metadata.push(...buildImagePostMetadata(post));
  } else {
    metadata.push(...buildTextPostMetadata(post));
  }

  if (post.hasAttachedUrl && !post.hasVideo) {
    metadata.push(...buildLinkPostMetadata(post));
  }

  return metadata;
}

export function buildUserMetadata(user: User): string[] {
  return buildDefaultUserMetadata(user);
}

function buildDefaultPostMetadata(post: Post): string[] {
  return [
    `<link rel="canonical" href="${post.url}"/>`,
    `<meta http-equiv="refresh" content="0;url=${post.url}"/>`,
    `<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />`,
    `<meta property="theme-color" content="${Constants.SuccessColor}" />`,
    `<meta property="og:site_name" content="${Constants.SiteName}" />`,
    `<meta property="og:title" content="@${post.username}" />`,
    `<meta property="og:description" content="${post.description}" />`,
    `<meta property="og:url" content="${post.url}" />`
  ];
}

function buildVideoPostMetadata(post: Post): string[] {
  const videoUrl = `https://${ProxyManager.getInstance().getNextProxy()}/${encodeURIComponent(post.videoUrls[0])}`;

  return [
    `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent(
      post.description ?? Constants.DefaultAuthorName
    )}&url=${encodeURIComponent(
      post.url.toString() ?? Constants.DefaultAuthorUrl
    )}" rel="alternate" type="application/json+oembed" title="vxThreads" />`,
    `<meta property="twitter:card" content="player" />`,
    `<meta property="twitter:player" content="${videoUrl}">`,
    `<meta property="twitter:player:width" content="${post.originalWidth}">`,
    `<meta property="twitter:player:height" content="${post.originalHeight}">`,
    `<meta property="og:video:url" content="${videoUrl}">`,
    `<meta property="og:video:secure_url" content="${videoUrl}">`,
    `<meta property="og:video:width" content="${post.originalWidth}">`,
    `<meta property="og:video:height" content="${post.originalHeight}">`,
    `<meta property="og:video:type" content="video/mp4">`
  ];
}

function buildLinkPostMetadata(post: Post): string[] {
  return [
    `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent(
      post.attachedDisplayUrl ?? Constants.DefaultAuthorName
    )}&url=${encodeURIComponent(
      post.attachedUrl ?? Constants.DefaultAuthorUrl
    )}" rel="alternate" type="application/json+oembed" title="vxThreads" />`
  ];
}

function buildImagePostMetadata(post: Post): string[] {
  return [
    `<meta property="twitter:card" content="summary_large_image" />`,
    `<meta property="twitter:image" content="${post.imageUrls[0]}" />`,
    `<meta property="twitter:image:width" content="${post.originalWidth}" />`,
    `<meta property="twitter:image:height" content="${post.originalHeight}" />`,
    `<meta property="og:image" content="${post.imageUrls[0]}" />`,
    `<meta property="og:image:width" content="${post.originalWidth}" />`,
    `<meta property="og:image:height" content="${post.originalHeight}" />`
  ];
}

function buildTextPostMetadata(post: Post): string[] {
  return [
    `<meta property="twitter:card" content="summary" />`,
    `<meta property="twitter:image" content="${post.profilePicUrl}" />`,
    `<meta property="twitter:image:width" content="150" />`,
    `<meta property="twitter:image:height" content="150" />`,
    `<meta property="og:image" content="${post.profilePicUrl}" />`,
    `<meta property="og:image:width" content="150" />`,
    `<meta property="og:image:height" content="150" />`
  ];
}

function buildDefaultUserMetadata(user: User): string[] {
  return [
    `<link rel="canonical" href="${user.url}"/>`,
    `<meta http-equiv="refresh" content="0;url=${user.url}"/>`,
    `<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />`,
    `<meta property="theme-color" content="${Constants.SuccessColor}" />`,
    `<meta property="og:site_name" content="${Constants.SiteName}" />`,
    `<meta property="og:title" content="${user.fullName} (@${user.username})" />`,
    `<meta property="og:description" content="${user.description}" />`,
    `<meta property="og:url" content="${user.url}" />`,
    `<meta property="twitter:card" content="summary" />`,
    `<meta property="twitter:image" content="${user.profilePicUrl}" />`,
    `<meta property="twitter:image:width" content="150" />`,
    `<meta property="twitter:image:height" content="150" />`,
    `<meta property="og:image" content="${user.profilePicUrl}" />`,
    `<meta property="og:image:width" content="150" />`,
    `<meta property="og:image:height" content="150" />`
  ];
}
