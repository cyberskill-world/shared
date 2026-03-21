export enum E_UploadType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
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
    [E_UploadType.AUDIO]: I_UploadTypeConfig;
    [E_UploadType.DOCUMENT]: I_UploadTypeConfig;
    [E_UploadType.OTHER]: I_UploadTypeConfig;
}

export interface I_UploadFileData {
    createReadStream: () => NodeJS.ReadableStream;
    filename: string;
}

export interface I_UploadFile {
    file: I_UploadFileData;
}

export interface I_UploadOptions {
    file: Promise<I_UploadFile>;
    path: string;
    type: E_UploadType;
    config?: I_UploadConfig;
}
