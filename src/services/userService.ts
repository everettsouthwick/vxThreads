import { buildUserPayload } from "../constants/body";
import { buildUserGraphQlHeaders } from "../constants/headers";
import { postBulkRouteDefinitions, postGraphQl } from "./threadsService";
import { buildUserMetadata } from "./metadataService";
import { User } from "../models/user";

export async function getUserMetadata(url: URL): Promise<string[]> {
  const user = await getUser(url);
  return buildUserMetadata(user);
}

export async function getUser(url: URL): Promise<User> {
  const userId = await getUserId(url);
  const userGraphQlHeaders = buildUserGraphQlHeaders();
  const userGraphQlBody = buildUserPayload(userId);

  const postGraphQlResponse = await postGraphQl(userGraphQlHeaders, userGraphQlBody);

  return buildUser(postGraphQlResponse.data.userData.user, url);
}

async function getUserId(url: URL): Promise<string> {
  const bulkRouteDefinitionsResponse = await postBulkRouteDefinitions(url);
  return bulkRouteDefinitionsResponse.payload.payloads[url.pathname].result.exports.rootView.props.user_id;
}

function buildUser(user: any, url: URL): User {
  const profilePicUrl = user?.profile_pic_url ?? "";
  const username = user?.username ?? "";
  const biography = user?.biography ?? "";
  const followerCount = user?.follower_count ?? 0;
  const fullName = user?.full_name ?? "";

  const engagement = `📢 ${followerCount.toLocaleString()}`;
  const description = `${biography}\n\n${engagement}`;

  return {
    profilePicUrl: profilePicUrl,
    username: username,
    biography: biography,
    followerCount: followerCount,
    fullName: fullName,
    engagement: engagement,
    description: description,
    url: url.toString()
  };
}
