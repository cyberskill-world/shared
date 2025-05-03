import type { I_Log as I_LogCommon } from '#typescript/index.js';

export enum E_IssueType {
    Error = 'error',
    Warning = 'warning',
}

export interface I_IssueEntry {
    type: E_IssueType;
    file: string;
    message: string;
    position?: string;
    rule?: string;
}

export interface T_ThrowError {
    message?: string;
    status?: {
        CODE: string | number;
        MESSAGE: string;
    };
    type?: 'graphql' | 'rest';
}

export interface I_Log extends I_LogCommon {
    printBoxedLog: (
        title: string,
        issues: I_IssueEntry[],
        color?: string,
    ) => void;
}

export interface I_CatchErrorOptions {
    shouldLog?: boolean;
    returnValue?: unknown;
    callback?: (error: Error) => void;
}
