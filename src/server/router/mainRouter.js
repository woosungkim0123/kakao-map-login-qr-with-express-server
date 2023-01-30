"use strict";
import express from "express";
import {
  getCourse,
  getGreet,
  getHome,
  getQr,
} from "../controller/mainController";

const mainRouter = express.Router();

mainRouter.get("/", getHome);
mainRouter.get("/greet", getGreet);
mainRouter.get("/course", getCourse);
mainRouter.route("/qr").get(getQr).post(process.qr);

export default mainRouter;
