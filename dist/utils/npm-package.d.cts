declare function getLatestPackageVersion(packageName: string, forceRefresh?: boolean): Promise<string>;
/**
 * Check if the installed package is outdated.
 * @param packageName Name of the package.
 * @param forceRefresh Whether to bypass cache and force refresh.
 * @returns True if the installed version is different from the latest version.
 */
declare function isPackageOutdated(packageName: string, forceRefresh?: boolean): Promise<boolean>;
/**
 * Update the specified package to the latest version.
 * @param packageName Name of the package.
 */
declare function updatePackage(packageName: string): Promise<void>;
declare function isCurrentProject(INIT_CWD: string, PACKAGE_NAME: string): boolean;

export { getLatestPackageVersion, isCurrentProject, isPackageOutdated, updatePackage };
