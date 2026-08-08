import { StatusCodes } from "http-status-codes";
import { ApiErrorCodes } from "./ApiCodes.js";

export const ApiHTTPCodeMap: Record<ApiErrorCodes, StatusCodes> = {
    // General/Server Errors
    [ApiErrorCodes.INTERNAL_SERVER_ERROR]: StatusCodes.INTERNAL_SERVER_ERROR,
    [ApiErrorCodes.NOT_FOUND]: StatusCodes.NOT_FOUND
};
