import { buildPostPayload } from '../constants/body';
import { buildPostGraphQlHeaders } from '../constants/headers';
import { Post } from '../models/post';
import { postBulkRouteDefinitions, postGraphQl } from './threadsService';
import { buildPostMetadata } from './metadataService';

export async function getPostMetadata(url: URL): Promise<string[]> {
    const post = await getPost(url);
    return buildPostMetadata(post);
}

export async function getPost(url: URL): Promise<Post> {
    const postId = await getPostId(url);
    const postGraphQlHeaders = buildPostGraphQlHeaders();
    const postGraphQlBody = buildPostPayload(postId);

    const postGraphQlResponse = await postGraphQl(
        postGraphQlHeaders,
        postGraphQlBody,
    );

    const threadItems =
        postGraphQlResponse.data.data.containing_thread.thread_items;
    const posts = threadItems.filter(
        (item: any) => item.post !== null && item.post !== undefined,
    );

    const post = posts[posts.length - 1].post;
    return buildPost(post, url);
}

export async function getPostId(url: URL): Promise<string> {
    const bulkRouteDefinitionsResponse = await postBulkRouteDefinitions(url);
    let postId;
    if (
        'redirect_result' in
        bulkRouteDefinitionsResponse.payload.payloads[url.pathname].result
    ) {
        postId =
            bulkRouteDefinitionsResponse.payload.payloads[url.pathname].result
                .redirect_result.exports.rootView.props.post_id;
    } else {
        postId =
            bulkRouteDefinitionsResponse.payload.payloads[url.pathname].result
                .exports.rootView.props.post_id;
    }
    return postId;
}

export function buildPost(post: any, url: URL): Post {
    const rawPost = buildRawPost(post, url);
    return consolidateRawPost(rawPost);
}

function buildRawPost(post: any, url: URL): Post {
    const profilePicUrl = post?.user?.profile_pic_url ?? '';
    const username = post?.user?.username ?? '';
    const caption = post?.caption?.text ?? '';
    const likeCount = post?.like_count ?? 0;
    const replyCount = post?.text_post_app_info?.direct_reply_count ?? 0;
    const imageUrls =
        post?.image_versions2?.candidates?.map(
            (image: any) => image?.url ?? [],
        ) ?? [];

    let videoUrls = [];
    if (post?.carousel_media) {
        videoUrls =
            post?.carousel_media[0]?.video_versions?.map(
                (video: any) => video?.url,
            ) ?? [];
    } else {
        videoUrls = post?.video_versions?.map((video: any) => video?.url) ?? [];
    }

    const originalWidth = post?.original_width ?? 640;
    const originalHeight = post?.original_height ?? 640;

    const sharedPosts: Post[] = buildRawNestedPost(post, url) ?? [];

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

function buildRawNestedPost(post: any, url: URL): Post[] {
    let posts: Post[] = [];

    if (post?.text_post_app_info?.share_info?.quoted_post) {
        let nestedPost = buildRawPost(
            post?.text_post_app_info?.share_info?.quoted_post,
            url,
        );
        nestedPost.isQuoted = true;
        posts.push(nestedPost);
    }

    if (post?.text_post_app_info?.share_info?.reposted_post) {
        let nestedPost = buildRawPost(
            post?.text_post_app_info?.share_info?.reposted_post,
            url,
        );
        nestedPost.isRepost = true;
        posts.push(nestedPost);
    }

    return posts;
}

function consolidateRawPost(post: Post): Post {
    if (post.sharedPosts.length === 0) {
        return post;
    }

    post.sharedPosts.forEach((p) => {
        if (p.isQuoted) {
            post.caption = `${post.caption}\n\n⤵️ Quoting @${p.username}\n\n${p.caption}`;
        } else if (p.isRepost) {
            if (post.caption === '') {
                post.profilePicUrl = p.profilePicUrl;
                post.username = p.username;
                post.caption = p.caption;
            }
        }
        post.likeCount += p.likeCount;
        post.replyCount += p.replyCount;
        post.imageUrls.unshift(...p.imageUrls);
        post.videoUrls.unshift(...p.videoUrls);
        post.originalHeight = post.originalHeight > p.originalHeight
            ? post.originalHeight
            : p.originalHeight;
        post.originalWidth = post.originalWidth > p.originalWidth
            ? post.originalWidth
            : p.originalWidth;

        p.sharedPosts.forEach((p2) => {
            if (p2.isQuoted) {
                if (p2.caption !== post.caption) {
                    post.caption = `${post.caption}\n\n⤵️ Quoting @${p2.username}\n\n${p2.caption}`;
                }
            } else if (p2.isRepost) {
                if (post.caption === '') {
                    post.profilePicUrl = p2.profilePicUrl;
                    post.username = p2.username;
                    post.caption = p2.caption;
                }
            }
            post.likeCount += p2.likeCount;
            post.replyCount += p2.replyCount;
            post.imageUrls.unshift(...p2.imageUrls);
            post.videoUrls.unshift(...p2.videoUrls);
            post.originalHeight = post.originalHeight > p2.originalHeight
                ? post.originalHeight
                : p2.originalHeight;
            post.originalWidth = post.originalWidth > p2.originalWidth
                ? post.originalWidth
                : p2.originalWidth;
        });
    });

    post.hasImage = post.imageUrls.length > 0;
    post.hasVideo = post.videoUrls.length > 0;
    post.engagement = `💬 ${post.replyCount.toLocaleString()}&emsp;❤️ ${post.likeCount.toLocaleString()}`;
    post.description = `${post.caption}\n\n${post.engagement}`;

    return post;
}
