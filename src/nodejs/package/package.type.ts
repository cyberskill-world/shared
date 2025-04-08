export interface T_PackageJson {
    name?: string;
    version?: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    [key: string]: any;
}

export interface I_GetPackage {
    path: string;
    file: T_PackageJson;
    isCurrentProject: boolean;
    isDepend: boolean;
    isDevDepend: boolean;
}

export interface I_CheckPackage {
    isCurrentProject: boolean;
    installedPath: string;
    file: T_PackageJson;
    isUpToDate: boolean;
}
