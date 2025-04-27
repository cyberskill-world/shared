import dotenvx from '@dotenvx/dotenvx';
import { bool, cleanEnv, str } from 'envalid';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

import type { I_Environment } from './env.type.js';

import { CYBERSKILL_STORAGE_DIRECTORY } from './env.constant.js';

export function loadEnvFile() {
    dotenvx.config();
}

export function getEnv(): I_Environment {
    loadEnvFile();

    const cleanedEnv = cleanEnv(process.env, {
        CWD: str({ default: process.cwd() }),
        DEBUG: bool({ default: false }),
        CYBERSKILL_STORAGE_DIRECTORY: str({ default: path.join(os.homedir(), CYBERSKILL_STORAGE_DIRECTORY) }),
    });

    const env = {
        CWD: cleanedEnv.CWD,
        DEBUG: cleanedEnv.DEBUG,
        CYBERSKILL_STORAGE_DIRECTORY: cleanedEnv.CYBERSKILL_STORAGE_DIRECTORY,
    };

    return env;
}
