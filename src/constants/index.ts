export * from './bestFilterList';

export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://localhost:5050/graphql';

export const ROOT_FONT_SIZE = 16;
