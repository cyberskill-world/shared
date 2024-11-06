import { defineConfig } from 'tsup';

export default defineConfig((options) => {
    return {
        entry: ['src/**/*'], // Entry points, specify particular files if needed
        outDir: 'dist', // Output directory for the compiled files
        format: ['cjs', 'esm'], // Output formats: CommonJS and ESM
        target: 'es5', // Target the latest JavaScript (change to 'es2017' or 'es2020' for broader support)
        splitting: false, // Disable code splitting
        sourcemap: true, // Enable sourcemaps during development (watch mode)
        minify: false, // Minify the output in production mode
        clean: true, // Clean the output directory before bundling
        dts: true, // Generate TypeScript declaration files (.d.ts)
        shims: true, // Enable polyfills for `__dirname`, `__filename`, etc.
    };
});
