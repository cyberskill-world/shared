import { Buffer } from 'node:buffer';
import { Transform } from 'node:stream';
import { ReadableStream } from 'node:stream/web';

import type { I_Return } from '#typescript/index.js';

import { RESPONSE_STATUS } from '#constant/index.js';

import type { I_UploadConfig, I_UploadFile, I_UploadFileData, I_UploadOptions, I_UploadTypeConfig, I_UploadValidationConfig } from './upload.type.js';

import { createWriteStream, mkdirSync, pathExistsSync } from '../fs/index.js';
import { dirname } from '../path/index.js';
import { BYTES_PER_MB } from './upload.constant.js';
import { E_UploadType } from './upload.type.js';

/**
 * Calculates the size of a file from a readable stream.
 * This function reads through the entire stream to determine the total byte size
 * by accumulating the length of each data chunk.
 *
 * @param stream - The readable stream to calculate the size for.
 * @returns A promise that resolves to the total size of the stream in bytes.
 */
export async function getFileSizeFromStream(stream: NodeJS.ReadableStream): Promise<number> {
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
 * Extracts and validates file data from an upload file.
 * This function processes upload files by:
 * - Extracting file metadata and creating a readable stream
 * - Calculating the file size from the stream
 * - Validating file size and extension against upload configuration
 * - Returning a standardized response with success status and error codes
 * - Providing validated file data for further processing
 *
 * @param type - The type of upload being processed (IMAGE, VIDEO, DOCUMENT, OTHER).
 * @param file - The upload file object containing file metadata and stream creation method.
 * @param config - Optional upload configuration. If not provided, uses default configuration.
 * @returns A promise that resolves to a standardized response containing validated file data or error information.
 */
export async function getAndValidateFile(type: E_UploadType, file: I_UploadFile, config?: I_UploadConfig): Promise<I_Return<I_UploadFileData>> {
    const fileData = await (await file).file;
    const stream = fileData.createReadStream();
    const fileSize = await getFileSizeFromStream(stream);
    const uploadConfig = config ?? createUploadConfig();

    const validationResult = validateUpload(
        { filename: fileData.filename, fileSize },
        uploadConfig,
        type,
    );

    if (!validationResult.isValid) {
        return {
            success: false,
            message: validationResult.error || 'File validation failed',
            code: RESPONSE_STATUS.BAD_REQUEST.CODE,
        };
    }

    return {
        success: true,
        result: fileData,
        message: 'File validated successfully',
    };
}

/**
 * Creates a validated web-readable stream from an upload file with size validation.
 * This function processes file uploads for web environments by:
 * - Validating file data using getAndValidateFile function
 * - Creating a size validation transform stream to monitor upload progress
 * - Returning a web-compatible ReadableStream with real-time validation
 * - Providing standardized error responses for validation failures
 * - Wrapping the stream in a standardized response format
 *
 * @param type - The type of upload being processed (IMAGE, VIDEO, DOCUMENT, OTHER).
 * @param file - The upload file object containing file metadata and stream creation method.
 * @param config - Optional upload configuration. If not provided, uses default configuration.
 * @returns A promise that resolves to a standardized response containing either a web ReadableStream or error information.
 */
export async function getFileWebStream(type: E_UploadType, file: I_UploadFile, config?: I_UploadConfig): Promise<I_Return<ReadableStream<Uint8Array>>> {
    const uploadConfig = config ?? createUploadConfig();
    const typeConfig = uploadConfig[type];

    const fileData = await getAndValidateFile(type, file, config);

    if (!fileData.success) {
        return fileData;
    }

    const { createReadStream } = fileData.result;

    let remainingBytes = typeConfig.sizeLimit;

    const sizeValidationStream = new Transform({
        transform(chunk: Buffer, _enc: BufferEncoding, cb) {
            remainingBytes -= chunk.length;

            if (remainingBytes < 0) {
                cb(new Error(`File size exceeds limit of ${typeConfig.sizeLimit / BYTES_PER_MB}MB`));
            }
            else {
                cb(null, chunk);
            }
        },
    });
    const originalStream = createReadStream();
    const validatedStream = originalStream.pipe(sizeValidationStream);

    return {
        success: true,
        result: new ReadableStream<Uint8Array>({
            start(controller) {
                validatedStream.on('data', (chunk: Buffer | string) => {
                    controller.enqueue(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
                });
                validatedStream.on('end', () => controller.close());
                validatedStream.on('error', (err: unknown) => controller.error(err));
            },
        }),
    };
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
export function validateFileExtension(filename: string, allowedExtensions: string[]): boolean {
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
export function validateUpload(
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
        [E_UploadType.AUDIO]: {
            allowedExtensions: ['mp3', 'wav', 'ogg', 'm4a', 'aac'],
            sizeLimit: 50 * 1024 * 1024, // 50MB
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
 * - File validation using getAndValidateFile function
 * - Automatic directory creation
 * - Stream-based file writing
 * - Comprehensive error handling with standardized response codes
 *
 * @param options - Upload configuration including file, path, type, and optional validation config.
 * @returns A promise that resolves to a standardized response with success status, message, file path, and response codes.
 */
export async function upload(options: I_UploadOptions): Promise<I_Return<string>> {
    const { path, file, config, type } = options;

    if (!path || typeof path !== 'string') {
        return {
            success: false,
            message: 'Invalid path provided',
            code: RESPONSE_STATUS.BAD_REQUEST.CODE,
        };
    }

    if (!file || typeof file !== 'object') {
        return {
            success: false,
            message: 'Invalid file provided',
            code: RESPONSE_STATUS.BAD_REQUEST.CODE,
        };
    }

    if (config) {
        const requiredTypes = [E_UploadType.IMAGE, E_UploadType.VIDEO, E_UploadType.DOCUMENT, E_UploadType.OTHER];

        for (const requiredType of requiredTypes) {
            if (!config[requiredType] || !Array.isArray(config[requiredType].allowedExtensions) || config[requiredType].allowedExtensions.length === 0) {
                return {
                    success: false,
                    message: `Invalid config for ${requiredType.toLowerCase()} files`,
                    code: RESPONSE_STATUS.BAD_REQUEST.CODE,
                };
            }
            if (typeof config[requiredType].sizeLimit !== 'number' || config[requiredType].sizeLimit <= 0) {
                return {
                    success: false,
                    message: `Invalid size limit for ${requiredType.toLowerCase()} files`,
                    code: RESPONSE_STATUS.BAD_REQUEST.CODE,
                };
            }
        }
    }

    try {
        const fileData = await getAndValidateFile(type, await file, config);

        if (!fileData.success) {
            return fileData;
        }

        const { createReadStream } = fileData.result;

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
            result: path,
            message: 'File uploaded successfully',
            code: RESPONSE_STATUS.OK.CODE,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'File upload failed',
            code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
        };
    }
}
