"use strict";
import { MainService } from "../service/MainService.js";

/**
 * GET Request Controller
 */
export const getHome = (req, res) => res.render("main/home");
export const getUsed = (req, res) => res.render("main/used");
export const getCourse = async (req, res) => {
  const course = await MainService.getAllCourse();
  return res.render("main/course", { course });
};
export const getQr = (req, res) => res.render("main/qr");

/**
 * POST Request Controller
 */
export const postQr = async (req, res) => {
  const code = req.body.code;
  if(!code) res.status(400).json({ code : "BAD_REQUEST", message : "잘못된 요청입니다." })
  try {
    await MainService.updateVisitedStatus(code);
    return res.status(200).json({ code : "OK", message : "방문 완료" })
  } catch (e) {
    if(e.code) return res.status(e.status).json({ code : e.code, message: e.message })
    else return res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message : "서버 에러" })
  }
}
