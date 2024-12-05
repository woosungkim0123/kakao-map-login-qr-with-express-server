const db = require("../config/db.js"); // 데이터베이스 설정 파일 가져오기
const bcrypt = require("bcrypt"); // 비밀번호 암호화를 위한 bcrypt 라이브러리 가져오기
const jwt = require("jsonwebtoken"); // JSON Web Token을 위한 라이브러리 가져오기

/**
 * 로그인 처리 함수
 * 
 * @param {*} req 클라이언트 요청 객체 (id, pw를 body에서 전달받음)
 * @param {*} res 서버 응답 객체 (성공 또는 에러 메시지 반환)
 * @returns 클라이언트에 JSON 형태의 응답을 반환
 * 
 * - 주요 동작:
 *   1. 클라이언트에서 전달받은 id, pw 값을 처리.
 *   2. id와 pw가 없는 경우 400 에러 응답 반환.
 *   3. 데이터베이스에서 id로 사용자 정보 조회.
 *   4. 사용자 정보가 없을 경우 404 에러 응답 반환.
 *   5. bcrypt를 사용하여 클라이언트의 pw와 저장된 pw를 비교.
 *   6. 비밀번호가 일치하지 않을 경우 401 에러 응답 반환.
 *   7. 비밀번호가 일치하면 JWT 토큰을 발급.
 *   8. 성공적으로 발급된 토큰과 함께 성공 응답 반환.
 */
const login = async (req, res) => {
    // id, pw 받기
    const loginId = req.body.id;
    const userPw = req.body.pw;

    // 유효성 검사: id와 pw가 없는 경우 에러 응답 반환
    if (!loginId || !userPw) {
        return res.status(400).json({status: "error", message: "id, pw는 필수입니다.", data: null});
    }

    // 데이터베이스에서 id로 사용자 정보 조회
    const user = await findUserByLoginId(loginId);
    if (!user) {
        return res.status(404).json({status: "error", message: "존재하지 않는 id입니다.", data: null});
    }

    // 비밀번호 비교: 클라이언트에서 받은 pw와 저장된 pw를 비교
    const isMatch = await bcrypt.compare(userPw, user.user_password);
    if (!isMatch) {
        return res.status(401).json({status: "error", message: "비밀번호가 일치하지 않습니다.", data: null});
    }

    // JWT 토큰 생성
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.user_id}, secretKey, {expiresIn: "10d"});
    
    // 성공 응답 반환
    res.json({status: "success", message: "로그인 성공", data: {token}});
};

// 사용자 검색: 로그인 id로 사용자 조회
const findUserByLoginId = async (loginId) => {    
    const QUERY = `
        SELECT 
            user_id
            , user_login_id
            , user_password
            , user_name 
        FROM 
            user 
        WHERE
            user_login_id=?`;
    return db.execute(QUERY, [loginId]).then((result) => result[0][0]);
}

module.exports = login;
