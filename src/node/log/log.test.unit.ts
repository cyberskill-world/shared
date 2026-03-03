import { describe, expect, it, vi } from 'vitest';

import { RESPONSE_STATUS } from '#constant/index.js';

import { catchError, throwError } from './log.util.js';

vi.mock('#config/env/index.js', () => ({
    getEnv: () => ({ DEBUG: true }),
}));

describe('throwError', () => {
    it('should throw GraphQLError by default', () => {
        expect(() => throwError({ message: 'fail' })).toThrow('fail');
    });

    it('should throw GraphQLError with status extension', () => {
        try {
            throwError({
                message: 'not found',
                status: RESPONSE_STATUS.NOT_FOUND,
                type: 'graphql',
            });
        }
        catch (error: any) {
            expect(error.extensions?.code).toBe(404);
        }
    });

    it('should throw standard Error for rest type', () => {
        expect(() => throwError({ message: 'rest fail', type: 'rest' })).toThrow('rest fail');
    });

    it('should use status MESSAGE as fallback when message is undefined', () => {
        expect(() =>
            throwError({
                status: RESPONSE_STATUS.BAD_REQUEST,
                type: 'rest',
            }),
        ).toThrow('Bad Request');
    });

    it('should fallback to "Internal server error" when no message or status MESSAGE', () => {
        expect(() =>
            throwError({
                status: { CODE: 'CUSTOM', MESSAGE: '' } as any,
                type: 'rest',
            }),
        ).toThrow('Internal server error');
    });
});

describe('catchError', () => {
    it('should return error response with success=false by default', () => {
        const result = catchError(new Error('test error'), { shouldLog: false });
        expect(result).toEqual({
            success: false,
            message: 'test error',
            code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
        });
    });

    it('should return specified returnValue when provided', () => {
        const result = catchError(new Error('test'), {
            shouldLog: false,
            returnValue: 'custom-value',
        });
        expect(result).toBe('custom-value');
    });

    it('should handle string error input', () => {
        const result = catchError('string error', { shouldLog: false });
        expect(result).toEqual(expect.objectContaining({
            success: false,
            message: 'string error',
        }));
    });

    it('should handle non-string non-Error input', () => {
        const result = catchError(42, { shouldLog: false });
        expect(result).toEqual(expect.objectContaining({
            success: false,
            message: 'Unknown error',
        }));
    });

    it('should call callback when provided', () => {
        const callback = vi.fn();
        catchError(new Error('cb test'), { shouldLog: false, callback });
        expect(callback).toHaveBeenCalledWith(expect.any(Error));
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
