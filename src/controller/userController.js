"use strict";
import { Error } from "../error/Error.js";
import { UserService } from "../service/UserService.js";


export const joinUser = async (req, res) => {
  const joinDto = req.body;
  try {
    const { token, user } = await UserService.join(joinDto);
    return res.status(200).json({ code: "OK", message: "회원가입 성공", token, user });
  } catch (e) {
    if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
    else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
  }
};

export const loginUser = async (req, res) => {
  try {
    const loginDto = req.body
    const { token, user }  = await UserService.login(loginDto);
    return res.status(200).json({ code: "OK", message: "로그인 성공", token, user });
  } catch (e) {
    console.error(e)
    if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
    else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
  }
};


export const authMe = async (req, res) => {
  try {
    const user = await UserService.findUser(req.u_no);
    return res.status(200).json({ code: "OK", message: "인증 성공", user });
  } catch (e) {
    if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
    else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
  }
 
}

