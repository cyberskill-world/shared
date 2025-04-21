import type { CopySyncOptions } from 'node:fs';

export interface I_CopySyncOptions extends CopySyncOptions {
    extensions?: string[];
}
