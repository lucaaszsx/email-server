import { ApiErrorCodes } from "../../ApiCodes.js";
import { BaseException } from "../Base.js";

export class NotFoundException extends BaseException {
    constructor() {
        super(ApiErrorCodes.NOT_FOUND);
    }
}