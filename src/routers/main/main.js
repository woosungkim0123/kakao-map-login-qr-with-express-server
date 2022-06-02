"use strict";

import express from "express";
import { output, process } from "./main.ctrl";

const router = express.Router();

router.get("/", output.home);
router.get("/greet", output.greet);
router.get("/course", output.course);
router.route("/qr").get(output.qr).post(process.qr);

export default router;
