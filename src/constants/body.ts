export function buildBulkRouteDefinitionsBody(url: URL): string {
  const payload: any = {
    "route_urls[0]": url.pathname,
    __a: "1",
    __comet_req: "29",
    lsd: "XudMkvWGqcnLxbgeR25f3V"
  };

  return Object.keys(payload)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`)
    .join("&");
}

export function buildPostPayload(postId: string): string {
  const payload: any = {
    lsd: "XudMkvWGqcnLxbgeR25f3V",
    variables: `{'postID':'${postId}'}`,
    doc_id: "6821609764538244"
  };

  return Object.keys(payload)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`)
    .join("&");
}

export function buildUserPayload(userId: string): string {
  const payload: any = {
    lsd: "KvS5OIjJwPDOa5R2p-MXJM",
    variables: `{'userID':'${userId}'}`,
    doc_id: "23996318473300828"
  };

  return Object.keys(payload)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`)
    .join("&");
}
