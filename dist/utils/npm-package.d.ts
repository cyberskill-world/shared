declare function getLatestPackageVersion(packageName: string, forceRefresh?: boolean): Promise<string>;
declare function isPackageOutdated(packageName: string, forceRefresh?: boolean): Promise<boolean>;
declare function updatePackage(packageName: string): Promise<void>;
declare function isCurrentProject(WORKING_DIRECTORY: string, PACKAGE_NAME: string): boolean;

export { getLatestPackageVersion, isCurrentProject, isPackageOutdated, updatePackage };
