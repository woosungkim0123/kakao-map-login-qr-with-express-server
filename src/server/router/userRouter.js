"use strict";
import express from "express";
import { getJoin, getLoign, postJoin, postLogin, postLogout } from "../controller/LoginController";
import { logoutCheck } from "../middleware/loginCheck";
import { joinForm, loginForm } from "../middleware/validation";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(joinForm, postJoin);
userRouter.route("/login").get(logoutCheck, getLoign).post(loginForm, postLogin);
userRouter.route("/logout").post(postLogout);
export default userRouter;
