import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import { defineConfig } from 'tsup';

export default defineConfig(({ watch, ...rest }) => {
    return {
        target: 'es5',
        entry: ['src/**/*.{js,ts,jsx,tsx}', '!src/**/*.stories.{js,ts,jsx,tsx}'],
        outDir: 'dist',
        format: ['cjs', 'esm'],
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        splitting: false,
        clean: true,
        experimentalDts: true,
        shims: true,
        injectStyle: true,
        sourcemap: !!watch,
        minify: !watch,
        esbuildPlugins: [
            sassPlugin({
                filter: /\.module\.scss$/,
                transform: postcssModules({}),
            }),
            sassPlugin({
                filter: /\.scss$/,
            }),
        ],
        ...rest,
    };
});
