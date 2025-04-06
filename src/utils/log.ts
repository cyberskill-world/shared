import { consola } from 'consola/browser';

import type { I_Log } from '#typescript/log.js';

export const log: I_Log = {
    silent: consola.silent,
    level: consola.level,
    fatal: consola.fatal,
    error: consola.error,
    warn: consola.warn,
    log: consola.log,
    info: consola.info,
    success: consola.success,
    ready: consola.ready,
    start: consola.start,
    box: consola.box,
    debug: consola.debug,
    trace: consola.trace,
    verbose: consola.verbose,
};
