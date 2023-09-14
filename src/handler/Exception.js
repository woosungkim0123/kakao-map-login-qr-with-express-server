export default class Exception {
  

  static BAD_REQUEST = { status: 400, code: "BAD_REQUEST", message: "잘못된 요청입니다." };
  static ID_EMPTY = { status: 400, code: "ID_EMPTY", message: "아이디를 입력해주세요." };
  static PW_EMPTY = { status: 400, code: "PW_EMPTY", message: "비밀번호를 입력해주세요." };
  static NAME_EMPTY = { status: 400, code: "NAME_EMPTY", message: "이름을 입력해주세요." };
  
  static UN_AUTHORIZED = { status: 401, code: "UN_AUTHORIZED", message: "아이디, 비밀번호를 확인해주세요." };
  
  
  static NOT_FOUND = { status: 404, code: "NOT_FOUND", message: "요청하신 QR 정보가 존재하지 않습니다." };
  
  static CONFLICT = { status: 409, code: "CONFLICT", message: "이미 완료된 코스입니다." };

  
  static QR_EMPTY = { statusCode: 400, statusText: "error", message: "QR코드가 없습니다.",  data: "" };
  static QR_BAD_REQUEST = { statusCode: 400, statusText: "error", message: "잘못된 QR정보 입니다.",  data: "" };
  static LOCATION_EMPTY = { statusCode: 400, statusText: "error", message: "위치 정보 없음",  data: "" };
  static OUT_OF_RANGE = { statusCode: 400, statusText: "error", message: "위치 적용 범위 초과",  data: "" };
  

  static AUTH_ERROR = { statusCode: 401, statusText: "error", message: "토큰 인증 에러", data : "" };
  static AUTH_EXPIRED = { statusCode: 401, statusText: "error", message: "토큰 만료", data : "" };
  static NOT_EQUAL_PASSWORD = { statusCode: 401, statusText: "error", message: "아이디, 비밀번호를 확인해주세요.", data : "" };
  static NOT_USER_FOUND = { statusCode: 401, statusText: "error", message: "아이디, 비밀번호를 확인해주세요.", data : "" };
  static ALREADY_VISTED = { statusCode: 409, statusText: "error", message: "이미 방문한 코스",  data: "" };
  static ID_EXIST = { statusCode: 409, statusText: "error", message: "이미 존재하는 아이디입니다.", data : "" };
  static INTERNAL_SERVER_ERROR = { statusCode: 500, statusText: "error", message: "서버 에러", data : "" };
}
