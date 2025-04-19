import dotenv from 'dotenv';
import { bool, cleanEnv, str } from 'envalid';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

import type { I_Environment } from './env.type.js';

import { CYBERSKILL_STORAGE_DIRECTORY } from './env.constant.js';

dotenv.config();

export function getEnv(): I_Environment {
    const processEnv = {
        DEBUG: process.env.DEBUG,
        CWD: process.env.CWD,
        CYBERSKILL_STORAGE_DIR: process.env.CYBERSKILL_STORAGE_DIR,
    };
    const baseEnv = cleanEnv(processEnv, {
        DEBUG: bool({ default: false }),
        CWD: str({
            default: process.cwd(),
        }),
        CYBERSKILL_STORAGE_DIR: str({
            default: path.join(os.homedir(), CYBERSKILL_STORAGE_DIRECTORY),
        }),
    });

    return {
        DEBUG: baseEnv.DEBUG,
        CWD: baseEnv.CWD,
        CYBERSKILL_STORAGE_DIR: baseEnv.CYBERSKILL_STORAGE_DIR,
    };
}
