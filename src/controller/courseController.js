"use strict";
import { Error } from "../error/Error.js";
import { CourseService } from "../service/CourseService.js";


export const qrCheck = async (req, res) => {
  const code = req.body.code;
  const u_no = req.u_no;
  try {
    await CourseService.updateVisitedStatus({ u_no, code });
    return res.status(200).json({ code: "OK", message: "방문 완료" });
  } catch (e) {
    if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
    else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
  }
};

export const courseVisitedInfo = async (req, res) => {
  try {
    const u_no = req.u_no
    const course = await CourseService.getAllCourse(u_no);
    return res.status(200).json({ code: "OK", course });
  } catch (e) {
    if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
    else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
  }
}