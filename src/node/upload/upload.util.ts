import type { I_UploadConfig, I_UploadOptions, I_UploadResult, I_UploadTypeConfig, I_UploadValidationConfig } from './upload.type.js';

import { createWriteStream, mkdirSync, pathExistsSync } from '../fs/index.js';
import { dirname } from '../path/index.js';
import { E_UploadType } from './upload.type.js';

/**
 * Calculates the size of a file from a readable stream.
 * This function reads through the entire stream to determine the total byte size
 * by accumulating the length of each data chunk.
 *
 * @param stream - The readable stream to calculate the size for.
 * @returns A promise that resolves to the total size of the stream in bytes.
 */
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

/**
 * Validates if a file has an allowed extension.
 * This function extracts the file extension from the filename and checks if it's
 * included in the list of allowed extensions (case-insensitive comparison).
 *
 * @param filename - The filename to check for valid extension.
 * @param allowedExtensions - An array of allowed file extensions (without dots).
 * @returns True if the file extension is allowed, false otherwise.
 */
function validateFileExtension(filename: string, allowedExtensions: string[]): boolean {
    const lastDotIndex = filename.lastIndexOf('.');

    if (lastDotIndex === -1) {
        return false;
    }

    const extension = filename.substring(lastDotIndex + 1).toLowerCase();
    return allowedExtensions.includes(extension);
}

/**
 * Validates an upload against the specified configuration.
 * This function performs comprehensive validation including:
 * - File extension validation against allowed extensions
 * - File size validation against size limits
 * - Returns detailed error messages for validation failures
 *
 * @param config - The validation configuration including filename and optional file size.
 * @param uploadConfig - The upload configuration containing allowed extensions and size limits.
 * @param uploadType - The type of upload being validated.
 * @returns An object indicating validation success and optional error message.
 */
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

/**
 * Creates a default upload configuration with predefined settings for different file types.
 * This function provides sensible defaults for image, video, document, and other file types,
 * including allowed extensions and size limits. The configuration can be customized with overrides.
 *
 * @param overrides - Optional configuration overrides to merge with the default configuration.
 * @returns A complete upload configuration object with defaults and any provided overrides.
 */
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

/**
 * Uploads a file with comprehensive validation and error handling.
 * This function processes file uploads with the following features:
 * - Input validation for path and file parameters
 * - Configuration validation for all upload types
 * - File size and extension validation
 * - Automatic directory creation
 * - Stream-based file writing
 * - Comprehensive error handling and reporting
 *
 * @param options - Upload configuration including file, path, type, and optional validation config.
 * @returns A promise that resolves to an upload result with success status, message, and file path.
 */
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
