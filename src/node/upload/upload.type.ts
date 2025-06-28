export enum E_UploadType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    DOCUMENT = 'DOCUMENT',
    OTHER = 'OTHER',
}

export interface I_UploadValidationConfig {
    filename: string;
    fileSize?: number;
}

export interface I_UploadTypeConfig {
    allowedExtensions: string[];
    sizeLimit: number;
}

export interface I_UploadConfig {
    [E_UploadType.IMAGE]: I_UploadTypeConfig;
    [E_UploadType.VIDEO]: I_UploadTypeConfig;
    [E_UploadType.DOCUMENT]: I_UploadTypeConfig;
    [E_UploadType.OTHER]: I_UploadTypeConfig;
}

export interface I_UploadOptions {
    file: Promise<{
        file: {
            createReadStream: () => NodeJS.ReadableStream;
            filename: string;
        };
    }>;
    path: string;
    type: E_UploadType;
    config?: I_UploadConfig;
}

export interface I_UploadResult {
    success: boolean;
    message: string;
    result: string;
}
