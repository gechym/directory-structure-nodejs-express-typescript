import express, {Request, Response, NextFunction, Express} from 'express';
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import http, {createServer} from "http";
import {ErrorBadRequest} from "./errors";
import handleError from "./errors/HandleError";

dotenv.config();
const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again in 15 minutes"
    }
}));
app.use(mongoSanitize());// Data sanitization against NoSQL query injection
app.use(handleError);




// error handler
app.get("/testError", (req: Request, res: Response, next: NextFunction) => {
    const number = Math.floor(Math.random() * 10);
    if (number > 5) {
        throw new ErrorBadRequest("Error test");
    }
    res.status(200).json({status: 200, message: "OK"});
})




// set up socket.io and bind it to our
const server: http.Server = createServer(app);
export default server;