export function getPostIdPayload(threadsPath: string): string {
    const payload: any = {
        'route_urls[0]': threadsPath,
        __a: '1',
        __comet_req: '29',
        lsd: 'XudMkvWGqcnLxbgeR25f3V',
    };

    return Object.keys(payload)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    payload[key],
                )}`,
        )
        .join('&');
}

export function getPostPayload(postId: string): string {
    const payload: any = {
        lsd: 'XudMkvWGqcnLxbgeR25f3V',
        variables: `{'postID':'${postId}'}`,
        doc_id: '6821609764538244',
    };

    return Object.keys(payload)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    payload[key],
                )}`,
        )
        .join('&');
}
