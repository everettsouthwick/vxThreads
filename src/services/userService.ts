import { buildUserPayload } from '../constants/body';
import { buildUserGraphQlHeaders } from '../constants/headers';
import { postBulkRouteDefinitions, postGraphQl } from './threadsService';

export async function getUser(url: URL): Promise<any> {
    const userId = await getUserId(url);
    const userGraphQlHeaders = buildUserGraphQlHeaders();
    const userGraphQlBody = buildUserPayload(userId);

    const postGraphQlResponse = await postGraphQl(userGraphQlHeaders, userGraphQlBody);

    return postGraphQlResponse.data.userData.user;
}

async function getUserId(url: URL): Promise<string> {
    const bulkRouteDefinitionsResponse = await postBulkRouteDefinitions(url);
    return bulkRouteDefinitionsResponse.payload.payloads[url.pathname].result.exports.rootView.props.user_id;
}