export const DEBUG = process.env.DEBUG === 'true';
export const IS_DEV = process.env.NODE_ENV !== 'production';
export const GRAPHQL_URI_DEFAULT = process.env.GRAPHQL_URI_DEFAULT || '/graphql';
export const IS_BROWSER = typeof window !== 'undefined';