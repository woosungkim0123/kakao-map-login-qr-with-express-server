"use strict";
import express from "express";
import {
  courseVisitedInfo, qrCheck,
} from "../controller/courseController";
import { isAuth } from "../middleware/auth";
import { qrForm } from "../middleware/validation";

const courseRouter = express.Router();

courseRouter.get("/info", isAuth,  courseVisitedInfo);
courseRouter.post("/qr", qrForm, isAuth, qrCheck);

export default courseRouter;
