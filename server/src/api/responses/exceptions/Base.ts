import type { ApiErrorCodes } from "../ApiCodes.js";

export class BaseException extends Error {
    public readonly apiCode: ApiErrorCodes;
    public readonly details: string[];

    constructor(apiCode: number, details: string[] = []) {
        super(`E${apiCode}`);

        this.apiCode = apiCode;
        this.details = details;
        this.name = this.constructor.name;

        Object.setPrototypeOf(this, BaseException.prototype);
    }
}