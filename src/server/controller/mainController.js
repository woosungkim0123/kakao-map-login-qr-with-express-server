"use strict";
import { Error } from "../error/Error.js";
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
export const getMypage = (req, res) => {
  const { name } = req.user;
  res.render("main/mypage", { name })
}
/**
 * POST Request Controller
 */
export const postQr = async (req, res) => {
  const code = req.body.code;
  if (!code) res.status(Error.BAD_REQUEST.status).json(Error.BAD_REQUEST);

  try {
    await MainService.updateVisitedStatus(code);
    return res.status(200).json({ code: "OK", message: "방문 완료" });
  } catch (e) {
    if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
    else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
  }
};
