export interface I_Environment {
    CWD: string;
    DEBUG: boolean;
    CYBERSKILL_STORAGE_DIRECTORY: string;
}

export enum E_Environment {
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development',
}
