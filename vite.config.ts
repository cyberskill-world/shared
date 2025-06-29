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
        target: 'es2015',
        outDir: 'dist',
        lib: {
            name: '@cyberskill/shared',
            cssFileName: 'style',
            entry: glob.sync('src/**/*.{ts,tsx,js,jsx}').reduce((entries, file) => {
                const entryName = file.replace(/\.(ts|tsx|js|jsx)$/, '');
                entries[entryName] = resolve(__dirname, file);
                return entries;
            }, {}),
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: (id) => {
                // Node.js built-ins
                if (builtinModules.includes(id) || builtinModules.some(m => id === `node:${m}`)) {
                    return true;
                }
                // All dependencies and peerDependencies
                if (allDeps.some(dep => id === dep || id.startsWith(`${dep}/`))) {
                    return true;
                }

                return false;
            },
        },
    },
    plugins: [dts()],
});
