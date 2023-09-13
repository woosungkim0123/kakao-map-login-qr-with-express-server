"use strict";
import express from "express";
import {
  courseVisitedInfo, qrCheck,
} from "./courseController";
import { isAuth } from "../middleware/auth";
import { qrForm } from "../middleware/validation";


const courseRouter = express.Router();

courseRouter.get("/info", isAuth,  courseVisitedInfo);
courseRouter.post("/", qrForm, isAuth, qrCheck);

export default courseRouter;
