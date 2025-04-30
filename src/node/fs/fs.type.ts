import type { CopyOptionsSync } from 'fs-extra';

export interface I_CopySyncOptions extends CopyOptionsSync {
    extensions?: string[];
}
