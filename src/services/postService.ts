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
    const builtPost = buildPost(post, url);
    console.log(builtPost.sharedPosts[0]);
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
    const profilePicUrl = post?.user?.profile_pic_url ?? '';
    const username = post?.user?.username ?? '';
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

    const originalWidth = post?.original_width ?? 640;
    const originalHeight = post?.original_height ?? 640;

    const sharedPosts: Post[] = buildNestedPost(post, url) ?? [];

    sharedPosts.forEach(firstLevelPost => {
        if (firstLevelPost.isQuoted) {
            caption = `${caption}\n\n⤵️ Quoting @${firstLevelPost.username}\n\n${firstLevelPost.caption}`
        } else {
            likeCount += firstLevelPost.likeCount;
            replyCount += firstLevelPost.replyCount;
        }

        imageUrls.unshift(...firstLevelPost.imageUrls);
        videoUrls.unshift(...firstLevelPost.videoUrls);
        firstLevelPost.sharedPosts.forEach(secondLevelPost => {
            if (secondLevelPost.isQuoted) {
                caption = `${caption}\n\n⤵️ Quoting @${secondLevelPost.username}\n\n${secondLevelPost.caption}`
            } else {
                likeCount += secondLevelPost.likeCount;
                replyCount += secondLevelPost.replyCount;
            }
            imageUrls.unshift(...secondLevelPost.imageUrls);
            videoUrls.unshift(...secondLevelPost.videoUrls);
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