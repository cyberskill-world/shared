#!/usr/bin/env node
import { default as yargs } from 'yargs';
import { hideBin } from 'yargs/helpers';

import { lintCheck, lintFix, lintStaged } from './commands/lint.js';

yargs(hideBin(process.argv))
    .command('lint:check', 'Run linting checks', lintCheck)
    .command('lint:fix', 'Fix linting and formatting issues', lintFix)
    .command(
        'lint-staged',
        'Run lint-staged with given configuration',
        lintStaged,
    )
    .help()
    .parse();
