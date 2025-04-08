import type { I_CheckPackage } from '#typescript/package.js';

export const CHECK_PACKAGE_EMPTY_RESULT: I_CheckPackage = {
    isCurrentProject: false,
    installedPath: '',
    file: {},
    isUpToDate: false,
};
