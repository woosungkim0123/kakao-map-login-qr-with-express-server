"use strict";
import express from "express";
import { authMe, joinUser, loginUser } from "../controller/userController.js";
import { isAuth } from "../middleware/auth.js";
import { joinForm, loginForm } from "../middleware/validation.js";

const userRouter = express.Router();

userRouter.post("/join", joinForm, joinUser);
userRouter.post("/login", loginForm, loginUser);
userRouter.get("/auth", isAuth, authMe);


export default userRouter;
