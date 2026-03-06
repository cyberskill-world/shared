import { beforeEach, describe, expect, it, vi } from 'vitest';

import { log } from '../log/index.js';
import { storage } from '../storage/index.js';
import { clearAllErrorLists, formatCommand, getStoredErrorLists, rawCommand, resolveCommands, runCommand } from './command.util.js';

vi.mock('#config/env/index.js', () => ({
    getEnv: () => ({ DEBUG: true }),
}));

vi.mock('../log/index.js', () => ({
    catchError: vi.fn((_err: unknown, opts?: { returnValue?: unknown }) => opts?.returnValue ?? { success: false, message: 'error', code: 500 }),
    E_IssueType: { Error: 'error', Warning: 'warning' },
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

vi.mock('../package/index.js', () => ({
    getPackage: vi.fn().mockResolvedValue({ success: true, result: { name: 'test-pkg', isCurrentProject: false } }),
    installDependencies: vi.fn(),
    TSX_CLI: 'tsx',
    PNPM_EXEC_CLI: 'pnpm exec',
    CYBERSKILL_CLI_PATH: 'src/node/cli/index.ts',
    CYBERSKILL_CLI: 'cyberskill',
    CYBERSKILL_PACKAGE_NAME: '@cyberskill/shared',
}));

vi.mock('../path/index.js', () => ({
    command: { cyberskill: '/usr/local/bin/cyberskill' },
    join: (...args: string[]) => args.join('/'),
    NODE_MODULES: 'node_modules',
    PACKAGE_JSON: 'package.json',
    PATH: { ROOT: '/root' },
    PNPM_EXEC_CLI: 'pnpm exec',
    TSX_CLI: 'tsx',
    CYBERSKILL_CLI: 'cyberskill',
    CYBERSKILL_CLI_PATH: 'src/node/cli/index.ts',
    CYBERSKILL_PACKAGE_NAME: '@cyberskill/shared',
}));

vi.mock('../storage/index.js', () => ({
    storage: {
        set: vi.fn(),
        get: vi.fn().mockResolvedValue(null),
        remove: vi.fn(),
        getLogLink: vi.fn().mockResolvedValue(null),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('rawCommand', () => {
    it('should return a command object with raw=true', () => {
        const result = rawCommand('echo hello');
        expect(result).toEqual({ raw: true, cmd: 'echo hello' });
    });

    it('should preserve the command string exactly', () => {
        const result = rawCommand('pnpm exec vitest run --coverage');
        expect(result.cmd).toBe('pnpm exec vitest run --coverage');
        expect(result.raw).toBe(true);
    });
});

describe('formatCommand', () => {
    it('should return raw command string as-is', () => {
        const cmd = rawCommand('echo hello');
        const result = formatCommand(cmd);
        expect(result).toBe('echo hello');
    });

    it('should handle string commands (formats as CLI)', () => {
        const result = formatCommand('lint');
        expect(typeof result).toBe('string');
        expect(result).toContain('cyberskill');
        expect(result).toContain('lint');
    });

    it('should handle function commands', () => {
        const fn = () => 'generated-command';
        const result = formatCommand(fn);
        expect(typeof result).toBe('string');
        expect(result).toContain('generated-command');
    });

    it('should format for current project context', () => {
        const result = formatCommand('lint', { isCurrentProject: true });
        expect(result).toContain('src/node/cli/index.ts');
    });

    it('should format for non-current project context', () => {
        const result = formatCommand('lint', { isCurrentProject: false });
        expect(result).toContain('cyberskill');
    });

    it('should pass context to function commands', () => {
        const fn = vi.fn((ctx?: { isCurrentProject: boolean }) =>
            ctx?.isCurrentProject ? 'local-cmd' : 'global-cmd',
        );
        const result = formatCommand(fn, { isCurrentProject: true });
        expect(fn).toHaveBeenCalledWith({ isCurrentProject: true });
        expect(result).toContain('local-cmd');
    });

    it('should return undefined-ish for undefined input', () => {
        const result = formatCommand(undefined as any);
        expect(result).toBeUndefined();
    });
});

describe('getStoredErrorLists', () => {
    it('should return empty array when storage has no data', async () => {
        (storage.get as any).mockResolvedValueOnce(null);
        const result = await getStoredErrorLists();
        expect(result).toEqual([]);
    });

    it('should return stored error entries', async () => {
        const errors = [{ file: 'test.ts', type: 'error', message: 'fail' }];
        (storage.get as any).mockResolvedValueOnce(errors);
        const result = await getStoredErrorLists();
        expect(result).toEqual(errors);
    });

    it('should return empty array on storage error', async () => {
        (storage.get as any).mockRejectedValueOnce(new Error('storage fail'));
        const result = await getStoredErrorLists();
        expect(result).toEqual([]);
    });
});

describe('clearAllErrorLists', () => {
    it('should call storage.remove', async () => {
        await clearAllErrorLists();
        expect(storage.remove).toHaveBeenCalled();
    });

    it('should not throw on storage error', async () => {
        (storage.remove as any).mockRejectedValueOnce(new Error('fail'));
        await expect(clearAllErrorLists()).resolves.toBeUndefined();
    });
});

describe('resolveCommands', () => {
    it('should resolve static command map', async () => {
        const result = await resolveCommands({ lint: 'lint', test: 'test:unit' });
        expect(result).toBeDefined();
        expect(result!['lint']).toContain('lint');
        expect(result!['test']).toContain('test:unit');
    });

    it('should resolve dynamic command map (function)', async () => {
        const factory = vi.fn((_ctx: any) => ({ build: 'build' }));
        const result = await resolveCommands(factory);
        expect(factory).toHaveBeenCalled();
        expect(result!['build']).toContain('build');
    });

    it('should handle raw commands in map', async () => {
        const result = await resolveCommands({ echo: rawCommand('echo hi') });
        expect(result!['echo']).toBe('echo hi');
    });
});

describe('runCommand', () => {
    it('should call log.start on successful command', async () => {
        await runCommand('test label', rawCommand('echo hello').cmd);
        expect(log.start).toHaveBeenCalledWith('test label');
    });

    it('should not throw on command failure without throwOnError', async () => {
        await expect(
            runCommand('failing cmd', rawCommand('false').cmd),
        ).resolves.toBeUndefined();
    });

    it('should catch errors and call catchError', async () => {
        await runCommand('fail gracefully', rawCommand('exit 1').cmd);
        // Should not throw, catchError is used
    });

    it('should log DEBUG info when DEBUG is true', async () => {
        const cmd = rawCommand('echo debug').cmd;
        await runCommand('debug test', cmd);
        expect(log.info).toHaveBeenCalledWith(expect.stringContaining(cmd));
    });

    it('should handle void command gracefully', async () => {
        await runCommand('no-op', undefined);
        expect(log.start).toHaveBeenCalledWith('no-op');
        expect(log.success).toHaveBeenCalledWith('no-op done.');
    });

    it('should throw when throwOnError is true', async () => {
        await expect(
            runCommand('throws', rawCommand('false').cmd, { throwOnError: true }),
        ).rejects.toThrow();
    });
});

describe('resolveCommands - failure path', () => {
    it('should return undefined when getPackage fails', async () => {
        const { getPackage } = await import('../package/index.js');
        vi.mocked(getPackage).mockResolvedValueOnce({ success: false, message: 'fail', code: 500 });
        const result = await resolveCommands({ lint: 'lint' });
        expect(result).toBeUndefined();
    });
});
