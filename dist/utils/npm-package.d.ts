/**
 * Get the latest version of an npm package (with cache).
 */
declare function getLatestPackageVersion(packageName: string, forceRefresh?: boolean): Promise<string>;
/**
 * Check if a package is outdated.
 */
declare function isPackageOutdated(packageName: string, forceRefresh?: boolean): Promise<boolean>;
/**
 * Update a package to the latest version.
 */
declare function updatePackage(packageName: string): Promise<void>;
/**
 * Check if current project matches a specific package name.
 */
declare function isCurrentProject(WORKING_DIRECTORY: string, PACKAGE_NAME: string): boolean;

export { getLatestPackageVersion, isCurrentProject, isPackageOutdated, updatePackage };
