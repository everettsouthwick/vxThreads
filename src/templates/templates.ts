export const errorTemplate = (status: any, statusText: any) => `
<!DOCTYPE html>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta property="og:title" content="VxThreads" />
        <meta property="og:description" content="${status} ${statusText}" />
    </head>
</html>
`;

export const postTemplate = (username: any, metadata: any, caption: any) => `
<!DOCTYPE html>
<html>
    <head>
        <title>${username}</title>
        ${metadata.join('')}
    </head>
    <body>
        <h1>${username}</h1>
        <p>${caption}</p>
    </body>
</html>
`;
