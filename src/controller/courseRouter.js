"use strict";
import express from "express";
import { getCourseList, qrCheck } from "./courseController";
import { isAuth } from "../middleware/auth";
import { qrForm } from "../middleware/validation";

const courseRouter = express.Router();

courseRouter.get("/", isAuth, getCourseList);
courseRouter.post("/", qrForm, isAuth, qrCheck);

export default courseRouter;
