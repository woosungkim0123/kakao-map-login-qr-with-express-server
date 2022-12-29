"use strict";
import express from "express";
import { output, process } from "../controller/mainController";

const mainRouter = express.Router();

mainRouter.get("/", output.home);
mainRouter.get("/greet", output.greet);
mainRouter.get("/course", output.course);
mainRouter.route("/qr").get(output.qr).post(process.qr);

export default mainRouter;
