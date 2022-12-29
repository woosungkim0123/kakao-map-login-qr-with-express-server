"use strict";

let db = ["SUBWAY2", "JEJUPIG"];

export const output = {
  home: (req, res) => res.render("main/home"),
  greet: (req, res) => res.render("main/greet"),
  course: (req, res) => res.render("main/course", { db }),
  qr: (req, res) => res.render("main/qr"),
};

export const process = {
  qr: (req, res) => {
    const { type } = req.body;
    if (db.indexOf(type) === -1) {
      db.push(type);
    }
    res.send({ success: true });
  },
};
