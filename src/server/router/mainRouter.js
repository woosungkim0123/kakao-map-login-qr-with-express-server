"use strict";
import express from "express";
import {
  getCourse,
  getHome,
  getMypage,
  getQr,
  getUsed, postQr,
} from "../controller/mainController";
import { loginCheck } from "../middleware/loginCheck";

const mainRouter = express.Router();

mainRouter.get("/", loginCheck, getHome);
mainRouter.get("/used", loginCheck, getUsed);
mainRouter.get("/course", loginCheck, getCourse);
mainRouter.route("/qr").get(loginCheck, getQr).post(postQr);
mainRouter.get("/mypage", loginCheck, getMypage);

export default mainRouter;
