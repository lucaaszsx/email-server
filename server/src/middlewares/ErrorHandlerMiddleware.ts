import { BaseException, InternalErrorException, sendApiResponse } from "../responses/index.js";
import type { LoggerInterface } from "../lib/logger/index.js";
import { ApiErrorCodes } from "../responses/ApiCodes.js";
import { InjectLogger } from "../decorators/index.js";
import type { ErrorRequestHandler } from "express";
import { PostgresError } from "postgres";
import { Env } from "../config/env.js";

export class ErrorHandlerMiddleware {
    @InjectLogger(__filename)
    private logger!: LoggerInterface;

    handler: ErrorRequestHandler = (err, req, res, _next) => {
        const location = `${req.method} ${req.url}`;

        if (err instanceof InternalErrorException) {
            this.logger.error(`${location} | ${err.name} (${err.apiCode}): ${err.message}`);

            sendApiResponse(req, res, {
                success: false,
                apiCode: ApiErrorCodes.INTERNAL_SERVER_ERROR,
                errorDetails: this.getProdErrorDetails(err.details)
            });
            return;
        } else if (err instanceof BaseException) {
            this.logger.warn(`${location} | ${err.name} (${err.apiCode})`);

            sendApiResponse(req, res, {
                success: false,
                apiCode: err.apiCode,
                errorDetails: err.details
            });
            return;
        } else if (err instanceof PostgresError) {
            this.logger.error(`${location} | Unexpected PostgreSQL error (${err.code}): ${err.message}`);

            sendApiResponse(req, res, {
                success: false,
                apiCode: ApiErrorCodes.INTERNAL_SERVER_ERROR,
                errorDetails: this.getProdErrorDetails([err.message, err.code])
            });
            return;
        }

        this.logger.error(
            `${location} | Unknown error:`,
            err instanceof Error ? err.stack ?? err.message : String(err)
        );

        sendApiResponse(req, res, {
            success: false,
            apiCode: ApiErrorCodes.INTERNAL_SERVER_ERROR,
            errorDetails: [String(err)]
        });
        return;
    }

    private getProdErrorDetails(details: string[]) {
        return Env.isProd ? [] : details;
    }
}
