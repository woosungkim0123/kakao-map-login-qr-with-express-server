const db = require("../config/db.js");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    // header에서 Bearer token 추출
    // authorization도 없어도 401 에러를 반환하도록 수정
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({status: "error", message: "토큰이 없습니다.", data: null});
    }
    
    // bearer token이 없을 경우 401 에러를 반환하도록 수정
    const token = authorization.split(" ")[1]; // Bearer 제거

    const secretKey = process.env.JWT_SECRET;

    // token을 해독해서 user_id를 추출
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey);
    } catch (error) {
        return res.status(401).json({status: "error", message: "토큰이 유효하지 않습니다.", data: null});
    }
    const userId = decoded.id;

    // db에서 user_id로 사용자 조회
    const user = await findUserById(userId);
    if (!user) {
        return res.status(401).json({status: "error", message: "사용자 정보가 없습니다.", data: null});
    }

    // 사용자 정보를 req 객체에 추가
    req.user = user;
    next();
};

// 사용자 검색: 로그인 id로 사용자 조회
const findUserById = async (userId) => {    
    const QUERY = `
        SELECT 
            user_id
            , user_login_id
            , user_password
            , user_name 
        FROM 
            user 
        WHERE
            user_id=?`;
    return db.execute(QUERY, [userId]).then((result) => result[0][0]);
}

module.exports = auth;
