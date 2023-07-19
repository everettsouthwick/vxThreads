const fetch = require('node-fetch');
import { HttpRequestError } from '../errors/httpRequestError';
import { buildBulkRouteDefinitionsHeaders, buildPostGraphQlHeaders } from '../constants/headers';
import { buildBulkRouteDefinitionsBody } from '../constants/body';

export async function postBulkRouteDefinitions(url: URL): Promise<any> {
    const bulkRouteDefinitionsResponse = await fetch(
        'https://www.threads.net/ajax/bulk-route-definitions/',
        {
            method: 'POST',
            headers: buildBulkRouteDefinitionsHeaders(),
            body: buildBulkRouteDefinitionsBody(url),
        },
    );

    if (!bulkRouteDefinitionsResponse.ok) {
        throw new HttpRequestError(bulkRouteDefinitionsResponse.status, 'https://www.threads.net/ajax/bulk-route-definitions/');
    }

    const responseText = await bulkRouteDefinitionsResponse.text();
    const responseJson = JSON.parse(responseText.slice(9)); // removing "for (;;);"
    return responseJson;
}

export async function postGraphQl(headers: any, body: string): Promise<any> {
    const graphQlResponse = await fetch('https://www.threads.net/api/graphql',
        {
            method: 'POST',
            headers: headers,
            body: body
        }
    );

    if (!graphQlResponse.ok) {
        throw new HttpRequestError(graphQlResponse.status, 'https://www.threads.net/api/graphql');
    }

    const responseJson = await graphQlResponse.json();
    return responseJson;
}