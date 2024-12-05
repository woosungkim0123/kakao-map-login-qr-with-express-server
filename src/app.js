// .env 파일에서 환경 변수를 로드하여 process.env에 추가
require('dotenv').config();

// 각 경로에 대한 핸들러 함수 가져오기
const join = require('./handler/join');
const login = require('./handler/login');
const courseList = require('./handler/course_list');
const auth = require('./middleware/auth');
const visitCourse = require('./handler/visit_course');

// Express 프레임워크 가져오기
const express = require('express');

// 서버가 실행될 포트 정의, 환경 변수에서 PORT가 설정되지 않은 경우 기본값은 8080
const PORT = process.env.PORT || 8080

// Express 애플리케이션 인스턴스 생성
const app = express();

// 들어오는 요청의 JSON 데이터를 파싱할 수 있도록 설정
app.use(express.json());

// API 경로 정의
// 사용자 회원가입 경로
app.post("/api/v1/auth/join", join);
// 사용자 로그인 경로
app.post("/api/v1/auth/login", login);
// 코스 목록 조회 경로 (인증 미들웨어를 통해 보호됨)
app.get("/api/v1/courses", auth, courseList);
// 코스 방문 처리 경로 (인증 미들웨어를 통해 보호됨)
app.post("/api/v1/courses/visit", auth, visitCourse);

// 서버를 시작하고 지정된 포트에서 요청을 대기
app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
});
