import express from "express";

const testRouter = express.Router();

testRouter.route("/test").get();

export default testRouter;
