import { defineConfig } from 'tsup';

export default defineConfig(({ watch, ...rest }) => {
    return {
        entry: [
            'src/index.ts',
            'src/**/*.{ts,tsx}',
            'src/**/*.css',
            'src/**/*.scss',
        ],
        loader: {
            '.css': 'copy',
            '.scss': 'copy',
        },
        outDir: 'dist',
        format: ['cjs', 'esm'],
        target: 'es5',
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        sourcemap: !!watch,
        minify: !watch,
        splitting: false,
        clean: true,
        dts: true,
        shims: true,
        injectStyle: true,
        ...rest,
    };
});
