import dotenvx from '@dotenvx/dotenvx';
import { cleanEnv, makeValidator, str } from 'envalid';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

import { E_Environment } from '#typescript/index.js';

import type { I_Environment } from './env.type.js';

import { CYBERSKILL_STORAGE_DIRECTORY } from './env.constant.js';

let isEnvFileLoaded = false;

const debugValidator = makeValidator((input) => {
    if (typeof input === 'boolean') {
        return input;
    }
    if (typeof input === 'string') {
        return true;
    }

    return false;
});

export function loadEnvFile() {
    if (process.env.NODE_ENV !== E_Environment.PRODUCTION && !isEnvFileLoaded) {
        dotenvx.config();
        isEnvFileLoaded = true;
    }
}

export function getEnv(): I_Environment {
    loadEnvFile();

    const cleanedEnv = cleanEnv(process.env, {
        CWD: str({ default: process.cwd() }),
        DEBUG: debugValidator({ default: false }),
        CYBERSKILL_STORAGE_DIRECTORY: str({ default: path.join(os.homedir(), CYBERSKILL_STORAGE_DIRECTORY) }),
    });

    const env = {
        CWD: cleanedEnv.CWD,
        DEBUG: cleanedEnv.DEBUG,
        CYBERSKILL_STORAGE_DIRECTORY: cleanedEnv.CYBERSKILL_STORAGE_DIRECTORY,
    };

    return env;
}
