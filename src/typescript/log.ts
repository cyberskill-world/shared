import type consola from 'consola';

import type { I_IssueEntry } from './command.js';

export interface T_ThrowError {
    message?: string;
    status?: {
        CODE: string | number;
        MESSAGE: string;
    };
    type?: 'graphql' | 'rest';
}

export interface I_Log {
    silent: typeof consola['silent'];
    level: typeof consola['level'];
    fatal: typeof consola['fatal'];
    error: typeof consola['error'];
    warn: typeof consola['warn'];
    log: typeof consola['log'];
    info: typeof consola['info'];
    success: typeof consola['success'];
    ready: typeof consola['ready'];
    start: typeof consola['start'];
    box: typeof consola['box'];
    debug: typeof consola['debug'];
    trace: typeof consola['trace'];
    verbose: typeof consola['verbose'];
    printBoxedLog: (
        title: string,
        issues: I_IssueEntry[],
        color?: string,
    ) => void;
}
