import { buildPostPayload } from '../constants/body';
import { buildPostGraphQlHeaders } from '../constants/headers';
import { postBulkRouteDefinitions, postGraphQl } from './threadsService';

export async function getPost(url: URL) {
    const postId = await getPostId(url);
    const postGraphQlHeaders = buildPostGraphQlHeaders();
    const postGraphQlBody = buildPostPayload(postId);

    const postGraphQlResponse = await postGraphQl(postGraphQlHeaders, postGraphQlBody);

    const threadItems = postGraphQlResponse.data.data.containing_thread.thread_items;
    const posts = threadItems.filter((item: any) => item.post !== null && item.post !== undefined);
    return posts.length > 0 ? posts[posts.length - 1].post : null;
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