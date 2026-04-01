import * as fsExtra from 'fs-extra';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('getCyberskillDirectory (fallback)', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should fallback to node_modules path when package.json is unreadable', async () => {
        vi.doMock('fs-extra', () => ({
            default: {
                ...fsExtra.default,
                readJsonSync: vi.fn().mockImplementation(() => {
                    throw new Error('Fake FS error');
                }),
            },
        }));

        const { getCyberskillDirectory } = await import('./path.constant.js');
        const dir = getCyberskillDirectory();

        expect(dir).toContain('node_modules');
        expect(dir).toContain('@cyberskill/shared');
    });

    it('should use working directory if it is the cyberskill package', async () => {
        vi.doMock('fs-extra', () => ({
            default: {
                ...fsExtra.default,
                readJsonSync: vi.fn().mockReturnValue({ name: '@cyberskill/shared' }),
            },
        }));

        const { getCyberskillDirectory } = await import('./path.constant.js');
        const dir = getCyberskillDirectory();

        expect(dir).not.toContain('node_modules');
        expect(dir).toContain('dist');
    });
});
