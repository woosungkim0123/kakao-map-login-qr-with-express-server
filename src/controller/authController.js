import exception from "../handler/exception.js";
import responseBody from "../handler/responseBody.js";
import { userJoinService, userLoginService } from "../service/userService.js";

export const joinUser = async (req, res) => {
  const { userId, userPassword, userName } = req.body;
  if (!userId || !userPassword || !userName) return res.status(400).json(new responseBody(400, "error", "모든 필드를 채워주세요.", ""));
  try {
    await userJoinService({ userId, userPassword, userName });
    return res.status(201).json(new responseBody(201, "success", "회원가입 완료", ""));
  } catch (e) {
    console.error(e);
    if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText : e.statusText, message: e.message, data : e.data = "" });
    else return res.status(exception.INTERNAL_SERVER_ERROR.statusCode).json(exception.INTERNAL_SERVER_ERROR);
  }
};

export const loginUser = async (req, res) => {
  const { userId, userPassword } = req.body;
  if (!userId || !userPassword) return res.status(400).json(new responseBody(400, "error", "아이디, 비밀번호를 확인해주세요.", ""));
  try {
    const loginResponseDto = await userLoginService({ userId, userPassword });
    return res.status(200).json(new responseBody(200, "success", "로그인 성공", loginResponseDto));
  } catch (e) {
    console.error(e);
    if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText : e.statusText, message: e.message, data : e.data = "" });
    else return res.status(exception.INTERNAL_SERVER_ERROR.statusCode).json(exception.INTERNAL_SERVER_ERROR);
  }
};


export const authMe = async (req, res) => {
  const user = req.user;
  return res.status(200).json(new responseBody(200, "success", "인증 성공", { name: user.user_name, user_image : user.user_image, user_provider : user.user_provider }));
}


