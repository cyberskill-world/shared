import dotenvx from '@dotenvx/dotenvx';
import { bool, cleanEnv, str } from 'envalid';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

import type { I_Environment } from './env.type.js';

import { CYBERSKILL_STORAGE_DIRECTORY } from './env.constant.js';

dotenvx.config();

export function getEnv(): I_Environment {
    const processEnv = {
        DEBUG: process.env.DEBUG || false,
        CWD: process.env.CWD || process.cwd(),
        CYBERSKILL_STORAGE_DIRECTORY: process.env.CYBERSKILL_STORAGE_DIRECTORY || path.join(os.homedir(), CYBERSKILL_STORAGE_DIRECTORY),
    };

    return cleanEnv(processEnv, {
        DEBUG: bool(),
        CWD: str(),
        CYBERSKILL_STORAGE_DIRECTORY: str(),
    });
}
