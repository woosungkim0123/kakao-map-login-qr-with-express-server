const db = require("../config/db.js"); // 데이터베이스 설정 파일 가져오기
const bcrypt = require("bcrypt"); // 비밀번호 암호화를 위한 bcrypt 라이브러리 가져오기

/**
 * 회원가입을 처리하는 함수
 * 
 * @param {*} req 클라이언트 요청 객체 (id, pw, name을 body에서 전달받음)
 * @param {*} res 서버 응답 객체 (성공 또는 에러 메시지 반환)
 * @returns 클라이언트에 JSON 형태의 응답을 반환
 * 
 * - 주요 동작:
 *   1. 클라이언트에서 전달받은 id, pw, name 값을 처리.
 *   2. id와 pw가 없는 경우 400 에러 응답 반환.
 *   3. 데이터베이스에서 중복된 id를 확인하고, 존재할 경우 409 에러 응답 반환.
 *   4. 비밀번호를 bcrypt로 암호화.
 *   5. 사용자 정보를 데이터베이스에 저장.
 *   6. 성공적으로 저장된 경우 성공 응답 반환.
 */
const join = async (req, res) => {
    // id, pw 받기
    const loginId = req.body.id;
    const userPw = req.body.pw;
    const userName = req.body.name || "";

    // 유효성 검사 (클라이언트로 부터 id, pw가 올바르게 전달되었는지 확인)
    if (!loginId || !userPw) {
        return res.status(400).json({status: "error", message: "id, pw는 필수입니다.", data: null});
    }

    // 중복된 id인지 확인
    const user = await findUserByLoginId(loginId);
    if (user) {
        return res.status(409).json({status: "error", message: "이미 존재하는 id입니다.", data: null});
    }

    // 비밀번호 암호화
    const pw = await bcrypt.hash(userPw, 10);

    // 데이터베이스에 사용자 정보 저장
    await saveUser(loginId, pw, userName);

    // 성공 응답 반환
    res.json({status: "success", message: "회원가입 성공", data: null});
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

// 사용자 저장 함수: 새로운 사용자 추가
const saveUser = async (loginId, pw, name) => {
    const QUERY = `
        INSERT INTO 
            user 
            (user_login_id, user_password, user_name) 
        VALUES 
            (?, ?, ?)`;
    return db.execute(QUERY, [loginId, pw, name]);
}


module.exports = join;
