import { Constants } from "../constants/constants"

export const errorTemplate = (url: URL) => `
<!DOCTYPE html>
<html>
    <head>
        <title>${Constants.Title}</title>
        <link rel="canonical" href="${url}"/>
        <meta http-equiv="refresh" content="0;url=${url}"/>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta property="theme-color" content="${Constants.ErrorColor}" />
        <meta property="og:title" content="${Constants.Title}" />
        <meta property="og:description" content="${Constants.ErrorMessage}" />
        <meta property="og:url" content="${url}" />
    </head>
</html>
`;

export const successTemplate = (metadata: string[]) => `
<!DOCTYPE html>
<html>
    <head>
        <title>${Constants.Title}</title>
        ${metadata.join('')}
    </head>
</html>
`;
