import { Constants } from "../constants/constants";
import { ProxyManager } from "../managers/proxyManager";

export function buildPostMetadata(post: any, url: URL): string[] {
    const profilePicUrl = post.user?.profile_pic_url ?? '';
    const username = post.user?.username ?? '';
    const caption = post.caption?.text ?? '';
    const likeCount = post.like_count ?? 0;
    const replyCount = post.text_post_app_info.direct_reply_count ?? 0;
    const images = post.image_versions2.candidates.map(
        (image: any) => image.url,
    );

    let videos = [];
    if (post.carousel_media !== null) {
        videos = post.carousel_media[0].video_versions.map((video: any) => video.url);
    } else {
        videos = post.video_versions.map((video: any) => video.url);
    }
    const originalWidth = post.original_width;
    const originalHeight = post.original_height;

    const engagement = `💬 ${replyCount.toLocaleString()}&emsp;❤️ ${likeCount.toLocaleString()}`;
    const description = `${caption}\n\n${engagement}`;

    const metadata: string[] = [];

    metadata.push(
        `<link rel="canonical" href="${url}"/>`,
        `<meta http-equiv="refresh" content="0;url=${url}"/>`,
        `<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />`,
        `<meta property="theme-color" content="${Constants.SuccessColor}" />`,
        `<meta property="og:site_name" content="${Constants.SiteName}" />`,
        `<meta property="og:title" content="@${username}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${url}" />`,
    );

    if (videos.length > 0) {
        const proxyManager = new ProxyManager();
        const videoUrl = `https://${proxyManager.getNextProxy()}/${encodeURIComponent(videos[0])}`;
        metadata.push(
            `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent(description ?? Constants.DefaultAuthorName)}&url=${encodeURIComponent(url.toString() ?? Constants.DefaultAuthorUrl)}" rel="alternate" type="application/json+oembed" title="vxThreads" />`,
            `<meta property="twitter:card" content="player" />`,
            `<meta property="twitter:player" content="${videoUrl}">`,
            `<meta property="twitter:player:width" content="${originalWidth}">`,
            `<meta property="twitter:player:height" content="${originalHeight}">`,
            `<meta property="og:video:url" content="${videoUrl}">`,
            `<meta property="og:video:secure_url" content="${videoUrl}">`,
            `<meta property="og:video:width" content="${originalWidth}">`,
            `<meta property="og:video:height" content="${originalHeight}">`,
            `<meta property="og:video:type" content="video/mp4">`,
        );
    } else if (images.length > 0) {
        metadata.push(
            `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent(Constants.DefaultAuthorName)}&url=${encodeURIComponent(url.toString() ?? Constants.DefaultAuthorUrl)}" rel="alternate" type="application/json+oembed" title="vxThreads" />`,
            `<meta property="twitter:card" content="summary_large_image" />`,
            `<meta property="twitter:image" content="${images[0]}" />`,
            `<meta property="twitter:image:width" content="${originalWidth}" />`,
            `<meta property="twitter:image:height" content="${originalHeight}" />`,
            `<meta property="og:image" content="${images[0]}" />`,
            `<meta property="og:image:width" content="${originalWidth}" />`,
            `<meta property="og:image:height" content="${originalHeight}" />`,
        );
    } else {
        metadata.push(
            `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent(Constants.DefaultAuthorName)}&url=${encodeURIComponent(url.toString() ?? Constants.DefaultAuthorUrl)}" rel="alternate" type="application/json+oembed" title="vxThreads" />`,
            `<meta property="twitter:card" content="summary" />`,
            `<meta property="twitter:image" content="${profilePicUrl}" />`,
            `<meta property="twitter:image:width" content="150" />`,
            `<meta property="twitter:image:height" content="150" />`,
            `<meta property="og:image" content="${profilePicUrl}" />`,
            `<meta property="og:image:width" content="150" />`,
            `<meta property="og:image:height" content="150" />`,
        );
    }

    return metadata;
}

export function buildUserMetadata(user: any, url: URL): string[] {
    const profilePicUrl = user.profile_pic_url;
    const username = user.username;
    const biography = user.biography;
    const followerCount = user.follower_count ?? 0;
    const fullName = user.full_name;

    const engagement = `📢 ${followerCount.toLocaleString()}`;
    const description = `${biography}\n\n${engagement}`;

    const metadata: string[] = [];

    metadata.push(
        `<link rel="canonical" href="${url}"/>`,
        `<meta http-equiv="refresh" content="0;url=${url}"/>`,
        `<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />`,
        `<meta property="theme-color" content="${Constants.SuccessColor}" />`,
        `<meta property="og:site_name" content="${Constants.SiteName}" />`,
        `<meta property="og:title" content="${fullName} (@${username})" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent(Constants.DefaultAuthorName)}&url=${encodeURIComponent(url.toString() ?? Constants.DefaultAuthorUrl)}" rel="alternate" type="application/json+oembed" title="vxThreads" />`,
        `<meta property="twitter:card" content="summary" />`,
        `<meta property="twitter:image" content="${profilePicUrl}" />`,
        `<meta property="twitter:image:width" content="150" />`,
        `<meta property="twitter:image:height" content="150" />`,
        `<meta property="og:image" content="${profilePicUrl}" />`,
        `<meta property="og:image:width" content="150" />`,
        `<meta property="og:image:height" content="150" />`,
    );

    return metadata;
}