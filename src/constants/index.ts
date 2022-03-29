export * from './bestFilterList';
export * from './category';

export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://localhost:5050/graphql';

export const ROOT_FONT_SIZE = 16;
export const TOKEN_KEY = 'welcoming-token';
