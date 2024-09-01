#!/usr/bin/env node
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import ora from 'ora';
import { default as yargs } from 'yargs';
import { hideBin } from 'yargs/helpers';

const createSpinner = (text: string) =>
    ora({ text, color: 'cyan', spinner: 'dots' });

const logStep = (step: string, message: string, icon: string = 'ℹ️') => {
    console.log(`${icon} ${chalk.blue(`[${step}]`)} ${chalk.white(message)}`);
};

export const lintCheck = async () => {
    logStep('1', 'Starting lint check...', '🚀');

    const spinner = createSpinner('Running checks...').start();

    try {
        logStep('1.1', 'Running TypeScript compiler check...', '🔍');

        const tsConfigPath = `${process.env.INIT_CWD}/tsconfig.json`;

        if (fs.existsSync(tsConfigPath)) {
            execSync(`npx tsc -p ${tsConfigPath} --noEmit`, {
                stdio: 'inherit',
            });
        } else {
            logStep('1.1', 'tsconfig.json file not found.', '⚠️');
        }

        logStep('1.1', 'TypeScript check completed successfully.', '✅');

        logStep('1.2', 'Running ESLint check...', '🔍');
        execSync(`npx eslint ${process.env.INIT_CWD}`, {
            stdio: 'inherit',
        });
        logStep('1.2', 'ESLint check completed successfully.', '✅');

        logStep('1.3', 'Running Prettier check...', '🔍');
        execSync(
            `npx prettier --check '${process.env.INIT_CWD}/**/*.{ts,tsx,js,jsx,json,css,scss,less}'`,
            { stdio: 'inherit' },
        );
        logStep('1.3', 'Prettier check completed successfully.', '✅');

        spinner.succeed('Lint check passed successfully!');
    } catch (error) {
        spinner.fail('Lint check failed.');
        console.error(`${chalk.red('❌ [Error]')} ${(error as Error).message}`);
        process.exit(1);
    }
};

export const lintFix = async () => {
    logStep('1', 'Starting lint and format fix...', '🚀');

    const spinner = createSpinner('Fixing issues...').start();

    try {
        logStep('1.1', 'Running ESLint fix...', '🔧');
        execSync(`npx eslint --fix ${process.env.INIT_CWD}`, {
            stdio: 'inherit',
        });
        logStep('1.1', 'ESLint fix completed successfully.', '✅');

        logStep('1.2', 'Running Prettier fix...', '🔧');
        execSync(
            `npx prettier --write '${process.env.INIT_CWD}/**/*.{ts,tsx,js,jsx,json,css,scss,less}'`,
            { stdio: 'inherit' },
        );
        logStep('1.2', 'Prettier fix completed successfully.', '✅');

        spinner.succeed('Lint and format fixes applied successfully!');
    } catch (error) {
        spinner.fail('Lint and format fix failed.');
        console.error(`${chalk.red('❌ [Error]')} ${(error as Error).message}`);
        process.exit(1);
    }
};

export const lintStaged = async () => {
    logStep('1', 'Starting lint-staged process...', '🚀');

    const spinner = createSpinner('Running lint-staged...').start();

    try {
        logStep('1.1', 'Running TypeScript compiler check...', '🔍');

        const tsConfigPath = `${process.env.INIT_CWD}/tsconfig.json`;

        if (fs.existsSync(tsConfigPath)) {
            execSync(`npx tsc -p ${tsConfigPath} --noEmit`, {
                stdio: 'inherit',
            });
        } else {
            logStep('1.1', 'tsconfig.json file not found.', '⚠️');
        }

        logStep('1.1', 'TypeScript check completed successfully.', '✅');

        logStep('1.2', 'Running ESLint fix...', '🔧');
        execSync(`npx eslint --fix ${process.env.INIT_CWD}`, {
            stdio: 'inherit',
        });
        logStep('1.2', 'ESLint fix completed successfully.', '✅');

        logStep('1.3', 'Running Prettier fix...', '🔧');
        execSync(
            `npx prettier --write '${process.env.INIT_CWD}/**/*.{ts,tsx,js,jsx,json,css,scss,less}'`,
            { stdio: 'inherit' },
        );
        logStep('1.3', 'Prettier fix completed successfully.', '✅');

        spinner.succeed('Lint-staged process completed successfully!');
    } catch (error) {
        spinner.fail('Lint-staged process failed.');
        console.error(`${chalk.red('❌ [Error]')} ${(error as Error).message}`);
        process.exit(1);
    }
};

export const setup = async () => {
    logStep('1', 'Starting setup process...', '🚀');

    const spinner = createSpinner('Setting up...').start();

    try {
        execSync(
            `npx rimraf ${process.env.INIT_CWD}/node_modules ${process.env.INIT_CWD}/package-lock.json && npm i -f`,
            {
                stdio: 'inherit',
            },
        );

        spinner.succeed('Setup process completed successfully!');
    } catch (error) {
        spinner.fail('Setup process failed.');
        console.error(`${chalk.red('❌ [Error]')} ${(error as Error).message}`);
        process.exit(1);
    }
};

yargs(hideBin(process.argv))
    .command('lint:check', 'Run linting checks', lintCheck)
    .command('lint:fix', 'Fix linting and formatting issues', lintFix)
    .command(
        'lint-staged',
        'Run lint-staged with given configuration',
        lintStaged,
    )
    .command('setup', 'Run setup with given configuration', setup)
    .help()
    .parse();
