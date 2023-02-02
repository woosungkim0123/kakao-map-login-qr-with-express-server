export class Error {
  static BAD_REQUEST = { status: 400, code: "BAD_REQUEST", message: "잘못된 요청입니다." };
  static NOT_FOUND = { status: 404, code: "NOT_FOUND", message: "요청하신 QR 정보가 존재하지 않습니다." };
  static CONFLICT = { status: 409, code: "CONFLICT", message: "이미 완료된 코스입니다." };
  static INTERNAL_SERVER_ERROR = { status: 500, code: "INTERNAL_SERVER_ERROR", message: "서버 에러" };
}
