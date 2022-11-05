import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {CustomError} from "./index";

 const handleError: ErrorRequestHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction) => {


    console.log("\n\n\n\n--------------------------------------------------------");
    console.log(err.message);
    console.log(err)
    console.log("--------------------------------------------------------\n\n\n\n");

    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message,
        stack: err.stack // only for development
    });

}

export default handleError;