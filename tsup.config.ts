import { defineConfig } from 'tsup';

export default defineConfig(({ watch, ...rest }) => {
    return {
        entry: ['src/**/*.{js,ts,jsx,tsx,css,scss}'],
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
