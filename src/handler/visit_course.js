const db = require("../config/db.js");

/**
 * 코스를 방문 처리하는 함수
 * 
 * @param {*} req 클라이언트 요청 객체 (qr 데이터를 body에서 전달받음)
 * @param {*} res 서버 응답 객체 (방문 성공 또는 에러 메시지 반환)
 * @returns 클라이언트에 JSON 형태의 응답을 반환
 * 
 * - 주요 동작:
 *   1. 요청에서 사용자 ID와 QR 정보를 확인.
 *   2. QR 정보가 없는 경우 400 에러 응답 반환.
 *   3. 데이터베이스에서 QR에 해당하는 코스 정보를 조회.
 *   4. 코스가 존재하지 않는 경우 404 에러 응답 반환.
 *   5. 해당 사용자가 이미 코스를 방문했는지 확인.
 *   6. 이미 방문한 경우 409 에러 응답 반환.
 *   7. 방문 처리 후 성공 응답 반환.
 */
const visitCourse = async (req, res) => {
    const loginUserId = req.user.user_id;
    const courseQr = req.body.qr;

    // QR 정보 유효성 확인
    if (!courseQr) {
        return res.status(400).json({status: "error", message: "qr은 필수입니다.", data: null});
    }

    // QR로 코스 정보 조회
    const course = await findCourseByQr(courseQr);
    if (!course) {
        return res.status(404).json({status: "error", message: "코스 정보가 없습니다.", data: null});
    }

    // 해당 코스를 이미 방문했는지 확인
    const isVisitedCourse = await isVisited(loginUserId, course.course_id);
    if (isVisitedCourse) {
        return res.status(409).json({status: "error", message: "이미 방문한 코스입니다.", data: null});
    }

    // 방문 처리
    await visit(loginUserId, course.course_id);

    return res.json({status: "success", message: "방문처리 성공", data: null});
}

/**
 * QR 정보로 코스 정보를 조회하는 함수
 * 
 * @param {string} courseQr QR 코드
 * @returns 해당 QR에 매핑된 코스 정보 (없으면 null 반환)
 */
const findCourseByQr = async (courseQr) => {    
    const QUERY = `
        SELECT 
              c.course_id
            , c.course_name
            , c.course_latitude
            , c.course_longitude
            , c.course_qr
        FROM 
            course c
        WHERE
            course_qr=?`;

    return db.execute(QUERY,[courseQr]).then((result) => result[0][0]);
}

/**
 * 사용자가 특정 코스를 방문했는지 확인하는 함수
 * 
 * @param {number} loginUserId 로그인한 사용자 ID
 * @param {number} courseId 코스 ID
 * @returns 방문 여부 (true: 방문함, false: 방문하지 않음)
 */
const isVisited = async (loginUserId, courseId) => {
    const QUERY = `
        SELECT 
            user_course_id
        FROM 
            user_course
        WHERE
            user_id=?
        AND
            course_id=?`;

    return db.execute(QUERY,[loginUserId, courseId]).then((result) => result[0][0]);
}

/**
 * 사용자의 코스 방문을 처리하는 함수
 * 
 * @param {number} loginUserId 로그인한 사용자 ID
 * @param {number} courseId 코스 ID
 * @returns 방문 처리 결과 (데이터베이스 실행 결과 반환)
 */
const visit = async (loginUserId, courseId) => {
    const QUERY = `
        INSERT INTO user_course 
        (
              user_id
            , course_id
        ) 
        VALUES 
        (
              ?
            , ?
        )`;
    return db.execute(QUERY, [loginUserId, courseId]);
}

module.exports = visitCourse;