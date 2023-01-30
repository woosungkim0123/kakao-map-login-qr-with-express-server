"use strict";

let db = ["SUBWAY2", "JEJUPIG"];

/**
 * GET Request Controller
 */
export const getHome = (req, res) => res.render("main/home");
export const getGreet = (req, res) => res.render("main/greet");
export const getCourse = (req, res) => res.render("main/course", { db });
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
