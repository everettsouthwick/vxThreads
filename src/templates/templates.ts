export const errorTemplate = (status: string, statusText: string, threadsUri: string) => `
<!DOCTYPE html>
<html>
    <head>
        <link rel="canonical" href="${threadsUri}"/>
        <meta http-equiv="refresh" content="0;url=${threadsUri}"/>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta property="theme-color" content="#ff443a" />
        <meta property="og:title" content="vxThreads" />
        <meta property="og:description" content="${status} ${statusText}" />
        <meta property="og:url" content="${threadsUri}" />
    </head>
</html>
`;

export const postTemplate = (metadata: string[]) => `
<!DOCTYPE html>
<html>
    <head>
        <title>vxThreads</title>
        ${metadata.join('')}
    </head>
</html>
`;
