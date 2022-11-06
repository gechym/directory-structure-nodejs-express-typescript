import express from "express";
import {getMessage} from "../controllers/MessageController";

const messageRouter = express.Router();

messageRouter.route("/").get(getMessage);

export default messageRouter;

