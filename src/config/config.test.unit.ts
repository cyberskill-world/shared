import { describe, expect, it } from 'vitest';

import { E_ConfigType } from './config.type.js';
import { mergeConfigs } from './config.util.js';

describe('mergeConfigs', () => {
    it('should throw for unknown config type', () => {
        expect(() => mergeConfigs('unknown-type' as any, { rules: {} })).toThrow('Unknown config type');
    });

    it('should handle commitlint config with default options', () => {
        const result = mergeConfigs(E_ConfigType.COMMITLINT);
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
    });

    it('should handle lint-staged config with default options', () => {
        const result = mergeConfigs(E_ConfigType.LINT_STAGED);
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
    });

    it('should deep merge commitlint config with custom options', () => {
        const result = mergeConfigs(E_ConfigType.COMMITLINT, { extends: ['@commitlint/config-conventional'] });
        expect(result).toBeDefined();
        expect(result['extends']).toContain('@commitlint/config-conventional');
    });

    it('should deep merge lint-staged config with custom options', () => {
        const result = mergeConfigs(E_ConfigType.LINT_STAGED, { '*.ts': 'eslint --fix' });
        expect(result).toBeDefined();
        expect(result['*.ts']).toBe('eslint --fix');
    });
});
