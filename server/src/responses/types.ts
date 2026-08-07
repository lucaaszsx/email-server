import { ApiErrorCodes } from './ApiCodes.js';

export type ApiResponse<T = Record<string, unknown>> =
    | {
          readonly success: true;
          readonly statusCode: number;
          readonly data: T;
          readonly error: null;
          readonly path: string;
          readonly timestamp: string;
      }
    | {
          readonly success: false;
          readonly statusCode: number;
          readonly apiCode: ApiErrorCodes;
          readonly data: null;
          readonly error: { readonly message: string; readonly details: string[] };
          readonly path: string;
          readonly timestamp: string;
      };