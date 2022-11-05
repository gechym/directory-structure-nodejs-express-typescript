import express, {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
}));
app.use(mongoSanitize());// Data sanitization against NoSQL query injection

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!");
})

const post = process.env.POST || 8080;
app.listen(post, () => {
    console.log(`✅ Server running on port ${post}`);
});