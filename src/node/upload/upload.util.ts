import type { I_UploadConfig, I_UploadOptions, I_UploadResult, I_UploadTypeConfig, I_UploadValidationConfig } from './upload.type.js';

import { createWriteStream, mkdirSync, pathExistsSync } from '../fs/index.js';
import { dirname } from '../path/index.js';
import { E_UploadType } from './upload.type.js';

async function getFileSizeFromStream(stream: NodeJS.ReadableStream): Promise<number> {
    return new Promise((resolve, reject) => {
        let size = 0;
        stream.on('data', (chunk) => {
            size += chunk.length;
        });
        stream.on('end', () => resolve(size));
        stream.on('error', reject);
    });
}

function validateFileExtension(filename: string, allowedExtensions: string[]): boolean {
    const lastDotIndex = filename.lastIndexOf('.');

    if (lastDotIndex === -1) {
        return false;
    }

    const extension = filename.substring(lastDotIndex + 1).toLowerCase();
    return allowedExtensions.includes(extension);
}

function validateUpload(
    config: I_UploadValidationConfig,
    uploadConfig: I_UploadConfig,
    uploadType: E_UploadType,
): { isValid: boolean; error?: string } {
    const { filename, fileSize } = config;
    const typeConfig: I_UploadTypeConfig = uploadConfig[uploadType];

    const { allowedExtensions, sizeLimit } = typeConfig;

    if (!validateFileExtension(filename, allowedExtensions)) {
        return {
            isValid: false,
            error: `File extension not allowed for ${uploadType.toLowerCase()} files. Allowed extensions: ${allowedExtensions.join(', ')}`,
        };
    }

    if (fileSize !== undefined && fileSize > sizeLimit) {
        const maxSizeMB = Math.round(sizeLimit / (1024 * 1024));
        return {
            isValid: false,
            error: `File size exceeds limit for ${uploadType.toLowerCase()} files. Maximum size: ${maxSizeMB}MB`,
        };
    }

    return { isValid: true };
}

export function createUploadConfig(overrides?: Partial<I_UploadConfig>): I_UploadConfig {
    const defaultConfig: I_UploadConfig = {
        [E_UploadType.IMAGE]: {
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
            sizeLimit: 5 * 1024 * 1024, // 5MB
        },
        [E_UploadType.VIDEO]: {
            allowedExtensions: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
            sizeLimit: 500 * 1024 * 1024, // 500MB
        },
        [E_UploadType.DOCUMENT]: {
            allowedExtensions: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
            sizeLimit: 10 * 1024 * 1024, // 10MB
        },
        [E_UploadType.OTHER]: {
            allowedExtensions: ['zip', 'rar', 'tar', 'gz'],
            sizeLimit: 5 * 1024 * 1024, // 5MB
        },
    };

    return { ...defaultConfig, ...overrides };
}

export async function upload(options: I_UploadOptions): Promise<I_UploadResult> {
    const { path, file, config, type } = options;

    if (!path || typeof path !== 'string') {
        return {
            success: false,
            message: 'Invalid path provided',
            result: '',
        };
    }

    if (!file || typeof file !== 'object') {
        return {
            success: false,
            message: 'Invalid file provided',
            result: '',
        };
    }

    if (config) {
        const requiredTypes = [E_UploadType.IMAGE, E_UploadType.VIDEO, E_UploadType.DOCUMENT, E_UploadType.OTHER];

        for (const requiredType of requiredTypes) {
            if (!config[requiredType] || !Array.isArray(config[requiredType].allowedExtensions) || config[requiredType].allowedExtensions.length === 0) {
                return {
                    success: false,
                    message: `Invalid config for ${requiredType.toLowerCase()} files`,
                    result: '',
                };
            }
            if (typeof config[requiredType].sizeLimit !== 'number' || config[requiredType].sizeLimit <= 0) {
                return {
                    success: false,
                    message: `Invalid size limit for ${requiredType.toLowerCase()} files`,
                    result: '',
                };
            }
        }
    }

    try {
        const fileData = await (await file).file;
        const { filename, createReadStream } = fileData;

        if (config) {
            const stream = createReadStream();
            const fileSize = await getFileSizeFromStream(stream);

            const validationResult = validateUpload(
                { filename, fileSize },
                config,
                type,
            );

            if (!validationResult.isValid) {
                return {
                    success: false,
                    message: validationResult.error || 'File validation failed',
                    result: '',
                };
            }
        }

        const dir = dirname(path);

        if (!pathExistsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        const writeStream = createReadStream();
        const out = createWriteStream(path);
        writeStream.pipe(out);

        await new Promise<void>((resolve, reject) => {
            out.on('finish', () => resolve());
            out.on('error', reject);
            writeStream.on('error', reject);
        });

        return {
            success: true,
            message: 'File uploaded successfully',
            result: path,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'File upload failed',
            result: '',
        };
    }
}
