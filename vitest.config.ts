
import { vitestUnit } from './src/config/vitest/vitest.unit.ts';
import { resolve } from 'path';

export default vitestUnit({
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
    test: {
        setupFiles: ['src/config/vitest/vitest.unit.setup.ts']
    }
});
