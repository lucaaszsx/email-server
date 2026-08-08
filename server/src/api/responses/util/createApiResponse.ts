import { ApiHTTPCodeMap } from '../ApiHTTPCodeMap.js';
import { ApiErrorMessages } from '../ApiMessages.js';
import { getReasonPhrase } from 'http-status-codes';
import { ApiErrorCodes } from '../ApiCodes.js';
import type { ApiResponse } from '../types.js';

interface CreateApiSuccessOptions<T = any> {
    success: true;
    statusCode: number;
    data?: T | null;
    path?: string;
}

interface CreateApiErrorOptions {
    success: false;
    apiCode: ApiErrorCodes;
    errorDetails?: string[];
    path?: string;
}

export type CreateApiResponseOptions<T = any> =
    | CreateApiSuccessOptions<T>
    | CreateApiErrorOptions;

export const createApiResponse = <T = any>(
    options: CreateApiResponseOptions<T>
): ApiResponse<T> => {
    const timestamp = new Date().toISOString();

    if (options.success) {
        return {
            success: true,
            statusCode: options.statusCode,
            data: options.data as T,
            error: null,
            path: options.path,
            timestamp
        } as ApiResponse<T>;
    } else {
        const apiCode = options.apiCode;
        const statusCode = ApiHTTPCodeMap[apiCode] as number;
        const message =
            ApiErrorMessages[apiCode as ApiErrorCodes] ||
            getReasonPhrase(statusCode) ||
            'Unknown message';

        return {
            success: false,
            statusCode,
            apiCode,
            data: null,
            error: {
                message,
                details: options.errorDetails || ''
            },
            path: options.path,
            timestamp
        } as ApiResponse<T>;
    }
};