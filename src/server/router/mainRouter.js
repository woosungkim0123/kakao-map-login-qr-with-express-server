"use strict";
import express from "express";
import {
  getCourse,
  getHome,
  getQr,
  getUsed,
} from "../controller/mainController";

const mainRouter = express.Router();

mainRouter.get("/", getHome);
mainRouter.get("/used", getUsed);
mainRouter.get("/course", getCourse);
mainRouter.route("/qr").get(getQr);

export default mainRouter;
