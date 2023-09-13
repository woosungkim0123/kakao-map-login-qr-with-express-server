"use strict";

import Exception from "../handler/Exception";
import { updateCourseVisitedStatus } from "../service/CourseService";



export const qrCheck = async (req, res) => {
  const user = req.user;
  const qrDto = req.body;
  try {
    await updateCourseVisitedStatus({ user, ...qrDto });
    
    return res.status(200).json({ code: "OK", message: "방문 완료" });
  } catch (e) {
    console.error(e);
    if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText : e.statusText, message: e.message, data : e.data = "" });
    else return res.status(Exception.INTERNAL_SERVER_ERROR.statusCode).json(Exception.INTERNAL_SERVER_ERROR);
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