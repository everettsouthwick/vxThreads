import { buildPostPayload } from '../constants/body';
import { buildPostGraphQlHeaders } from '../constants/headers';
import { Post } from '../models/post';
import { postBulkRouteDefinitions, postGraphQl } from './threadsService';
import { buildPostMetadata } from './metadataService';

export async function getPostMetadata(url: URL): Promise<string[]> {
    const post = await getPost(url);
    return buildPostMetadata(post);
}

async function getPost(url: URL): Promise<Post> {
    const postId = await getPostId(url);
    const postGraphQlHeaders = buildPostGraphQlHeaders();
    const postGraphQlBody = buildPostPayload(postId);

    const postGraphQlResponse = await postGraphQl(postGraphQlHeaders, postGraphQlBody);

    const threadItems = postGraphQlResponse.data.data.containing_thread.thread_items;
    const posts = threadItems.filter((item: any) => item.post !== null && item.post !== undefined);

    const post = posts[posts.length - 1].post;
    return buildPost(post, url);
}

async function getPostId(url: URL): Promise<string> {
    const bulkRouteDefinitionsResponse = await postBulkRouteDefinitions(url);
    let postId;
    if ('redirect_result' in bulkRouteDefinitionsResponse.payload.payloads[url.pathname].result) {
        postId = bulkRouteDefinitionsResponse.payload.payloads[url.pathname].result.redirect_result.exports.rootView.props
            .post_id;
    } else {
        postId = bulkRouteDefinitionsResponse.payload.payloads[url.pathname].result.exports.rootView.props
            .post_id;
    }
    return postId;
}

function buildPost(post: any, url: URL): Post {
    let profilePicUrl = post?.user?.profile_pic_url ?? '';
    let username = post?.user?.username ?? '';
    let caption = post?.caption?.text ?? '';
    let likeCount = post?.like_count ?? 0;
    let replyCount = post?.text_post_app_info?.direct_reply_count ?? 0;
    const imageUrls = post?.image_versions2?.candidates?.map(
        (image: any) => image?.url,
    ) ?? [];

    let videoUrls = [];
    if (post?.carousel_media !== null) {
        videoUrls = post?.carousel_media[0]?.video_versions?.map((video: any) => video?.url) ?? [];
    } else {
        videoUrls = post?.video_versions?.map((video: any) => video?.url) ?? [];
    }

    let originalWidth = post?.original_width ?? 640;
    let originalHeight = post?.original_height ?? 640;

    const sharedPosts: Post[] = buildNestedPost(post, url) ?? [];

    sharedPosts.forEach(p2 => {
        profilePicUrl = profilePicUrl || p2.profilePicUrl;
        username = username || p2.username;
        imageUrls.unshift(...p2.imageUrls);
        videoUrls.unshift(...p2.videoUrls);
        originalHeight > p2.originalHeight ? originalHeight : p2.originalHeight;
        originalWidth > p2.originalWidth ? originalWidth : p2.originalWidth;

        if (p2.isQuoted) {
            caption = `${caption}\n\n⤵️ Quoting @${p2.username}\n\n${p2.caption}`
        } else {
            caption === '' ? caption = p2.caption : caption;
            likeCount += p2.likeCount;
            replyCount += p2.replyCount;
        }

        p2.sharedPosts.forEach(p3 => {
            profilePicUrl = profilePicUrl || p3.profilePicUrl;
            username = username || p3.username;
            imageUrls.unshift(...p3.imageUrls);
            videoUrls.unshift(...p3.videoUrls);
            originalHeight > p3.originalHeight ? originalHeight : p3.originalHeight;
            originalWidth > p3.originalWidth ? originalWidth : p3.originalWidth;

            if (p3.isQuoted) {
                caption = `${caption}\n\n⤵️ Quoting @${p3.username}\n\n${p3.caption}`
            } else {
                caption === '' ? caption = p3.caption : caption;
                likeCount += p3.likeCount;
                replyCount += p3.replyCount;
            }
            imageUrls.unshift(...p3.imageUrls);
            videoUrls.unshift(...p3.videoUrls);
        });
    });

    const engagement = `💬 ${replyCount.toLocaleString()}&emsp;❤️ ${likeCount.toLocaleString()}`;
    const description = `${caption}\n\n${engagement}`;

    return {
        profilePicUrl: profilePicUrl,
        username: username,
        caption: caption,
        likeCount: likeCount,
        replyCount: replyCount,
        imageUrls: imageUrls,
        hasImage: imageUrls.length > 0,
        videoUrls: videoUrls,
        hasVideo: videoUrls.length > 0,
        originalWidth: originalWidth,
        originalHeight: originalHeight,
        engagement: engagement,
        description: description,
        url: url.toString(),
        sharedPosts: sharedPosts,
        isQuoted: false,
        isRepost: false,
    };
}

function buildNestedPost(post: any, url: URL): Post[] {
    let posts: Post[] = [];

    if (post?.text_post_app_info?.share_info?.quoted_post) {
        let nestedPost = buildPost(post?.text_post_app_info?.share_info?.quoted_post, url);
        nestedPost.isQuoted = true;
        posts.push(nestedPost);
    }

    if (post?.text_post_app_info?.share_info?.reposted_post) {
        let nestedPost = buildPost(post?.text_post_app_info?.share_info?.reposted_post, url);
        nestedPost.isRepost = true;
        posts.push(nestedPost);
    }

    return posts;
}