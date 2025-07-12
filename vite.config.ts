import fs from 'fs';
import { glob } from 'glob';
import { builtinModules } from 'module';
import { resolve } from 'path';
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

function isExternal(id) {
    if (builtinModulesSet.has(id) || nodeBuiltinModulesSet.has(id)) {
        return true;
    }
    if (externalDeps.has(id)) {
        return true;
    }
    return allDeps.some(dep => id.startsWith(`${dep}/`));
}

const entryPoints = glob.sync(['src/**/index.{ts,tsx}', 'src/**/*.rsc.ts'], {
    ignore: ['src/**/*.type.ts', 'src/**/*.d.ts'],
    absolute: true,
}).reduce((entries, file) => {
    const entryName = file.replace(/^.*\/src\//, '').replace(/\.(ts|tsx)$/, '');
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
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: isExternal,
            output: {
                sourcemap: false,
                compact: true,
                preserveModules: true,
                preserveModulesRoot: 'src',
                exports: 'named',
            },
            treeshake: {
                moduleSideEffects: false,
                propertyReadSideEffects: false,
                unknownGlobalSideEffects: false,
                tryCatchDeoptimization: false,
                correctVarValueBeforeDeclaration: true,
            },
        },
        copyPublicDir: false,
        cssCodeSplit: false,
        target: 'es2015',
    },
    plugins: [
        dts({
            logLevel: 'error',
            insertTypesEntry: true,
            compilerOptions: {
                declaration: true,
                declarationMap: false,
                emitDeclarationOnly: true,
            },
        }),
    ],
    esbuild: {
        target: 'es2015',
        treeShaking: true,
        legalComments: 'none',
    },
});
