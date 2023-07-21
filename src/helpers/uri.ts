export function sanitizeUri(uri: string): URL {
  let url;
  try {
    url = new URL(uri);
  } catch (_) {
    url = new URL(`https://threads.net${uri}`);
  }
  return url;
}
