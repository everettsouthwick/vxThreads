const fetch = require('node-fetch');
import config from '../config.json';
import { getPostIdPayload, getPostPayload } from '../api/fetcher';
import { getPostIdHeaders, getPostHeaders } from '../api/headers';
import { Constants } from '../constants/constants';

export async function getPost(threadsPath: string) {
    const postId = await getPostId(threadsPath);
    const getPostBody = getPostPayload(postId);

    const getPostResponse = await fetch('https://www.threads.net/api/graphql', {
        method: 'POST',
        headers: getPostHeaders(),
        body: getPostBody,
    });

    if (!getPostResponse.ok) {
        throw new Error('Failed to get post');
    }

    const getPostResponseJson = await getPostResponse.json();
    const threadItems = getPostResponseJson.data.data.containing_thread.thread_items;
    const posts = threadItems.filter((item: any) => item.post !== null && item.post !== undefined);
    return posts.length > 0 ? posts[posts.length - 1].post : null;
}

export function generateMetadata(post: any, threadsPath: string) {
    const threadsUri = `https://threads.net${threadsPath}`;
    const avatar = post.user.profile_pic_url;
    const username = post.user.username;
    const caption = post.caption.text;
    const likeCount = post.like_count ?? 0;
    const replyCount = post.text_post_app_info.direct_reply_count ?? 0;
    const images = post.image_versions2.candidates.map(
        (image: any) => image.url,
    );

    let videos = [];
    if (post.carousel_media !== null && post.carousel_media !== undefined) {
        videos = post.carousel_media.video_versions.map((video: any) => video.url);
    } else {
        videos = post.video_versions.map((video: any) => video.url);
    }
    const originalWidth = post.original_width;
    const originalHeight = post.original_height;

    const engagement = `💬 ${replyCount.toLocaleString()}&emsp;❤️ ${likeCount.toLocaleString()}`;
    const description = `${caption}\n\n${engagement}`;

    const metadata: string[] = [];

    metadata.push(
        `<link rel="canonical" href="${threadsUri}"/>`,
        `<meta http-equiv="refresh" content="0;url=${threadsUri}"/>`,
        `<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />`,
        `<meta property="theme-color" content="${Constants.SuccessColor}" />`,
        `<meta property="og:site_name" content="${Constants.SiteName}" />`,
        `<meta property="og:title" content="@${username}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${threadsUri}" />`,
    );

    if (videos.length > 0) {
        const videoUrl = `https://${config.proxies[0]}/${encodeURIComponent(videos[0])}`;
        metadata.push(
            `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent(description)}&url=${encodeURIComponent(threadsUri)}" rel="alternate" type="application/json+oembed" title="vxThreads" />`,
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
            `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent('')}&url=${encodeURIComponent(threadsUri)}" rel="alternate" type="application/json+oembed" title="vxThreads" />`,
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
            `<link href="https://vxthreads.net/oembed?text=${encodeURIComponent('')}&url=${encodeURIComponent(threadsUri)}" rel="alternate" type="application/json+oembed" title="vxThreads" />`,
            `<meta property="twitter:card" content="summary" />`,
            `<meta property="twitter:image" content="${avatar}" />`,
            `<meta property="twitter:image:width" content="150" />`,
            `<meta property="twitter:image:height" content="150" />`,
            `<meta property="og:image" content="${avatar}" />`,
            `<meta property="og:image:width" content="150" />`,
            `<meta property="og:image:height" content="150" />`,
        );
    }

    return {
        metadata,
        description,
        username,
    };
}

async function getPostId(threadsPath: string) {
    const getPostIdBody = getPostIdPayload(threadsPath);
    const getPostIdResponse = await fetch(
        'https://www.threads.net/ajax/bulk-route-definitions/',
        {
            method: 'POST',
            headers: getPostIdHeaders(),
            body: getPostIdBody,
        },
    );

    if (!getPostIdResponse.ok) {
        throw new Error('Failed to get post id');
    }

    const responseText = await getPostIdResponse.text();
    const responseJson = JSON.parse(responseText.slice(9)); // removing "for (;;);"
    let postId;
    if ('redirect_result' in responseJson.payload.payloads[threadsPath].result) {
        postId = responseJson.payload.payloads[threadsPath].result.redirect_result.exports.rootView.props
            .post_id;
    } else {
        postId = responseJson.payload.payloads[threadsPath].result.exports.rootView.props
            .post_id;
    }

    return postId;
}
