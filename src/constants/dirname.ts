import { dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

export const PROJECT_ROOT = dirname(__filename);

export const WORKING_DIRECTORY = process.env.INIT_CWD || process.cwd();
