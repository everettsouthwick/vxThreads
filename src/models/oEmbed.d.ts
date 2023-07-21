export interface OEmbed {
  type: string;
  version: string;
  title: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
  cache_age: number;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  url: string;
  width: number;
  height: number;
  html: string;
}
