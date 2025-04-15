import { defineConfig } from 'tsup';

export default defineConfig(({ watch, ...rest }) => {
    return {
        target: 'es5',
        entry: ['src/**/*.{js,ts,jsx,tsx,css,scss,json}'],
        loader: {
            '.css': 'copy',
            '.scss': 'copy',
            '.json': 'copy',
        },
        outDir: 'dist',
        format: ['cjs', 'esm'],
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        sourcemap: !!watch,
        minify: !watch,
        splitting: false,
        clean: true,
        experimentalDts: true,
        shims: true,
        injectStyle: false,
        ...rest,
    };
});
