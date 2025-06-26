import type { I_UploadConfig, I_UploadOptions, I_UploadResult, I_UploadValidationConfig } from './upload.type.js';

import { createWriteStream, mkdirSync, pathExistsSync } from '../fs/index.js';
import { dirname } from '../path/index.js';

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
): { isValid: boolean; error?: string } {
    const { filename, fileSize } = config;
    const { allowedExtensions, sizeLimit } = uploadConfig;

    if (!validateFileExtension(filename, allowedExtensions)) {
        return {
            isValid: false,
            error: `File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`,
        };
    }

    if (fileSize !== undefined && fileSize > sizeLimit) {
        const maxSizeMB = Math.round(sizeLimit / (1024 * 1024));
        return {
            isValid: false,
            error: `File size exceeds limit. Maximum size: ${maxSizeMB}MB`,
        };
    }

    return { isValid: true };
}

export async function upload(options: I_UploadOptions): Promise<I_UploadResult> {
    const { path, file, config } = options;

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
        if (!Array.isArray(config.allowedExtensions) || config.allowedExtensions.length === 0) {
            return {
                success: false,
                message: 'Invalid allowedExtensions in config',
                result: '',
            };
        }

        if (typeof config.sizeLimit !== 'number' || config.sizeLimit <= 0) {
            return {
                success: false,
                message: 'Invalid sizeLimit in config',
                result: '',
            };
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
