import { describe, expect, it } from 'vitest';

import { E_PackageType } from './package.type.js';

describe('E_PackageType', () => {
    it('should have all expected package type values', () => {
        expect(E_PackageType.DEPENDENCY).toBe('dependencies');
        expect(E_PackageType.DEV_DEPENDENCY).toBe('devDependencies');
        expect(E_PackageType.PEER_DEPENDENCY).toBe('peerDependencies');
        expect(E_PackageType.BUNDLE_DEPENDENCY).toBe('bundleDependencies');
        expect(E_PackageType.OPTIONAL_DEPENDENCY).toBe('optionalDependencies');
    });

    it('should contain exactly 5 values', () => {
        const values = Object.values(E_PackageType);
        expect(values).toHaveLength(5);
    });
});
