export default class CustomError extends Error {
    constructor(public message: string, public status: number) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}