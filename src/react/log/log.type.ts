import type consola from 'consola';

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
}
