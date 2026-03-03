import { describe, expect, it, vi } from 'vitest';

import { formatCommand, rawCommand } from './command.util.js';

vi.mock('#config/env/index.js', () => ({
    getEnv: () => ({ DEBUG: true }),
}));

vi.mock('../log/index.js', () => ({
    catchError: vi.fn(),
    log: {
        silent: vi.fn(),
        level: 4,
        fatal: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        log: vi.fn(),
        info: vi.fn(),
        success: vi.fn(),
        ready: vi.fn(),
        start: vi.fn(),
        box: vi.fn(),
        debug: vi.fn(),
        trace: vi.fn(),
        verbose: vi.fn(),
        printBoxedLog: vi.fn(),
    },
}));

vi.mock('../path/index.js', () => ({
    command: { cyberskill: '/usr/local/bin/cyberskill' },
    join: (...args: string[]) => args.join('/'),
    NODE_MODULES: 'node_modules',
    PACKAGE_JSON: 'package.json',
    PATH: { ROOT: '/root' },
}));

vi.mock('../storage/index.js', () => ({
    storage: {
        set: vi.fn(),
        get: vi.fn().mockResolvedValue([]),
        remove: vi.fn(),
    },
}));

describe('rawCommand', () => {
    it('should return a command object with raw=true', () => {
        const result = rawCommand('echo hello');
        expect(result).toEqual({ raw: true, cmd: 'echo hello' });
    });
});

describe('formatCommand', () => {
    it('should return raw command string as-is', () => {
        const cmd = rawCommand('echo hello');
        const result = formatCommand(cmd);
        expect(result).toBe('echo hello');
    });

    it('should handle string commands', () => {
        const result = formatCommand('lint');
        expect(typeof result).toBe('string');
    });

    it('should handle function commands', () => {
        const fn = () => 'generated-command';
        const result = formatCommand(fn);
        expect(typeof result).toBe('string');
    });
});
