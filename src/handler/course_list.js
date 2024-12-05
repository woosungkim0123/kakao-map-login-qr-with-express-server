const db = require("../config/db.js");

/**
 * 코스 목록 조회 핸들러
 * 
 * @param {*} req 클라이언트 요청 객체 (로그인한 사용자의 정보를 포함)
 * @param {*} res 서버 응답 객체 (성공 또는 에러 메시지 반환)
 * @returns 클라이언트에 JSON 형태의 응답을 반환
 * 
 * - 주요 동작:
 *   1. 클라이언트 요청에서 로그인 사용자의 ID를 추출.
 *   2. 데이터베이스에서 로그인 사용자가 조회할 수 있는 코스 목록을 가져옴.
 *   3. 성공적으로 코스 목록을 가져온 경우 JSON 형태로 반환.
 */
const courseList = async (req, res) => {
    // 로그인한 사용자의 ID를 추출
    const loginUserId = req.user.user_id;

    // 코스 목록을 가져옴 (로그인한 사용자가 방문한 여부도 함께 조회)
    const courseList = await getCourseListWithUser(loginUserId);
    
    // 성공 응답 반환
    return res.json({status: "success", message: "코스 목록 조회 성공", data: courseList});
}

// 코스 목록과 사용자가 방문한 여부를 함께 조회
const getCourseListWithUser = async (loginUserId) => {    
    const QUERY = `
        SELECT 
              c.course_id
            , c.course_name
            , c.course_latitude
            , c.course_longitude
            , c.course_qr
            , 
            CASE 
                WHEN uc.user_course_id IS NOT NULL THEN 'true'
                ELSE 'false'
            END AS is_visited
        FROM 
            course c 
        LEFT JOIN 
            user_course uc ON c.course_id = uc.course_id AND uc.user_id=?`;
    return db.execute(QUERY,[loginUserId]).then((result) => result[0]);
}

module.exports = courseList;