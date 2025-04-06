import process from 'node:process';

export const IS_BROWSER = typeof window !== 'undefined';
export const DEBUG = process.env.DEBUG === 'true';
