import {CustomError} from "./index";

export default class BadRequestError extends CustomError {
    constructor(public message: string) {
        super(`[BAD_REQUEST]:${message}`, 400);
    }
}