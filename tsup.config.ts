import { defineConfig } from 'tsup';

export default defineConfig((options) => {
    return {
        entry: ['src/index.ts', 'src/**/*.ts?(x)'],
        outDir: 'dist', 
        format: ['cjs', 'esm'], 
        target: 'es5', 
        external: ['react', 'react/jsx-runtime'],
        sourcemap: !!options.watch,
        minify: !options.watch,
        treeshake: true,
        splitting: true,
        clean: true,
        dts: true, 
        shims: true,
    };
});
