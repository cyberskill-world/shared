import * as chalk from 'chalk';
import { I_ErrorEntry } from '../typescript/command.js';

declare const yellow: chalk.ChalkInstance;
declare const red: chalk.ChalkInstance;
declare const log: {
    step: (current: number | null, total: number | null, message: string) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    boxedResult: (title: string, message: string, color?: chalk.ChalkInstance) => void;
    logResults: (entries: I_ErrorEntry[], color: typeof yellow | typeof red, icon: string, groupName: string) => void;
    displayResults: () => Promise<void>;
};

export { log };
