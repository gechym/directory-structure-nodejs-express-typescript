import express, {Request, Response, NextFunction, Express} from 'express';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import http, {createServer} from "http";
import handleError from "./errors/HandleError";
import fs from 'fs';

dotenv.config();
const app: Express = express();






app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again in 15 minutes"
    }
}));
app.use(mongoSanitize());// Data sanitization against NoSQL query injection
app.use(handleError);

// error handler
app.get("/play", (req: Request, res: Response, next: NextFunction) => {

    // const videoPath = `${__dirname}/public/videoplayback.mp4`;
    // const videoSize = fs.statSync(videoPath).size; // 32.5 MB  = 34,135,980 bytes

    // const range  = req.headers.range; //33554432-34135979
    // console.log("range", range);
    
    // const chunkSize = 10 ** 6; // 1MB

    // // pick the number from the range string received from the client
    // const start = Number((range as string).replace(/\D/g, "")); //bytes=33554432-34135979 => 33554432

    // const end = Math.min(start + chunkSize, videoSize - 1);

    // const contentLength = end - start + 1;
    // const headers = {
    //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    //     "Accept-Ranges": "bytes",
    //     "Content-Length": contentLength,
    //     "Content-Type": "video/mp4",
    // };
    // res.writeHead(206, headers);

    // const videoStream = fs.createReadStream(videoPath, {start, end});

    // videoStream.pipe(res);


    const videoPath = `${__dirname}/public/videoplayback.mp4`
    const videoSize = fs.statSync(videoPath).size
    const range = req.headers.range!!

    const start = Number(range.replace(/\D/g,""))
    const chuckSize = 10 ** 6
    const end = Math.min(chuckSize + start , videoSize - 1) 

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, {start, end});

    videoStream.pipe(res);
})



// set up socket.io and bind it to our
const server: http.Server = createServer(app);
export default server;