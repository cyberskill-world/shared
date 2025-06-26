export interface I_UploadValidationConfig {
    filename: string;
    fileSize?: number;
}

export interface I_UploadConfig {
    allowedExtensions: string[];
    sizeLimit: number;
}

export interface I_UploadOptions {
    file: Promise<{
        file: {
            createReadStream: () => NodeJS.ReadableStream;
            filename: string;
        };
    }>;
    path: string;
    config?: I_UploadConfig;
}

export interface I_UploadResult {
    success: boolean;
    message: string;
    result: string;
}
