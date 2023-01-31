"use strict";

import { MainService } from "../service/MainService.js";

let db = ["SUBWAY2", "JEJUPIG"];

/**
 * GET Request Controller
 */
export const getHome = (req, res) => res.render("main/home");
export const getUsed = (req, res) => res.render("main/used");
export const getCourse = async (req, res) => {
  const course = await MainService.getAllCourse();
  console.log(course);
  res.render("main/course", { course });
};
export const getQr = (req, res) => res.render("main/qr");

/**
 * POST Request Controller
 */
export const process = {
  qr: (req, res) => {
    const { type } = req.body;
    if (db.indexOf(type) === -1) {
      db.push(type);
    }
    res.send({ success: true });
  },
};
