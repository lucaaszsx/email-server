import { ApiErrorCodes } from '../../ApiCodes.js';
import { BaseException } from '../Base.js';

export class InternalErrorException extends BaseException {
    constructor(details?: string[]) {
        super(ApiErrorCodes.INTERNAL_SERVER_ERROR, details);
    }
}