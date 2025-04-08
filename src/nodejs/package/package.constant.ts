import type { I_CheckPackage } from './package.type.js';

export const CHECK_PACKAGE_EMPTY_RESULT: I_CheckPackage = {
    isCurrentProject: false,
    installedPath: '',
    file: {},
    isUpToDate: false,
};
