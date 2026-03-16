import { glob } from 'glob';
import fs from 'node:fs';
import { builtinModules } from 'node:module';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));

const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];

const externalDeps = new Set(allDeps);
const builtinModulesSet = new Set(builtinModules);
const nodeBuiltinModulesSet = new Set(builtinModules.map(m => `node:${m}`));

/**
 * Determines if a module should be treated as external during bundling.
 * This function checks if a module ID should be excluded from the bundle
 * based on whether it's a built-in Node.js module, a dependency, or a
 * sub-module of a dependency.
 *
 * The function checks:
 * - Built-in Node.js modules (both with and without 'node:' prefix)
 * - Direct dependencies from package.json
 * - Sub-modules of dependencies (e.g., 'lodash/get')
 *
 * @param id - The module ID to check for external status.
 * @returns True if the module should be treated as external, false otherwise.
 */
function isExternal(id: string) {
    if (builtinModulesSet.has(id) || nodeBuiltinModulesSet.has(id)) {
        return true;
    }
    if (externalDeps.has(id)) {
        return true;
    }
    return allDeps.some(dep => id.startsWith(`${dep}/`));
}

/**
 * Generates entry points for the library build by scanning source files.
 * This configuration scans for index files and React Server Components (RSC) files
 * in the src directory, excluding type definition files. It creates entry points
 * that map to the file structure for proper library exports.
 *
 * The entry points include:
 * - All index.{ts,tsx} files in subdirectories
 * - All .rsc.ts files (React Server Components)
 * - Excludes type definition files (*.type.ts, *.d.ts)
 *
 * Entry names are derived from the file path relative to src/.
 */
const RE_SRC_PREFIX = /^.*\/src\//;
const RE_TS_EXT = /\.(ts|tsx)$/;

const entryPoints = glob.sync(['src/**/index.{ts,tsx}', 'src/**/*.rsc.ts', 'src/config/vitest/vitest.*.ts'], {
    ignore: ['src/**/*.type.ts', 'src/**/*.d.ts', 'src/**/*.test.*.ts', 'src/**/*.test.*.tsx', 'src/**/*.setup.ts'],
    absolute: true,
}).reduce<Record<string, string>>((entries, file) => {
    const entryName = file.replace(RE_SRC_PREFIX, '').replace(RE_TS_EXT, '');
    entries[entryName] = file;

    return entries;
}, {});

export default defineConfig({
    resolve: {
        alias: {
            '#public': resolve(__dirname, 'public'),
            '#config': resolve(__dirname, 'src/config'),
            '#constant': resolve(__dirname, 'src/constant'),
            '#node': resolve(__dirname, 'src/node'),
            '#react': resolve(__dirname, 'src/react'),
            '#style': resolve(__dirname, 'src/style'),
            '#typescript': resolve(__dirname, 'src/typescript'),
            '#util': resolve(__dirname, 'src/util'),
        },
    },
    build: {
        lib: {
            name: '@cyberskill/shared',
            cssFileName: 'style',
            entry: entryPoints,
            formats: ['es'],
        },
        rollupOptions: {
            external: isExternal,
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
                exports: 'named',
            },
            treeshake: {
                moduleSideEffects: false,
                propertyReadSideEffects: false,
                unknownGlobalSideEffects: false,
            },
        },
        sourcemap: true,
        copyPublicDir: false,
        cssCodeSplit: false,
        target: 'es2022',
    },
    plugins: [
        dts({
            logLevel: 'error',
            insertTypesEntry: true,
            exclude: ['src/**/*.test.*.ts', 'src/**/*.test.*.tsx'],
            compilerOptions: {
                declaration: true,
                declarationMap: false,
                emitDeclarationOnly: true,
            },
        }),
    ],
    esbuild: {
        target: 'es2022',
        treeShaking: true,
        legalComments: 'none',
    },
});
