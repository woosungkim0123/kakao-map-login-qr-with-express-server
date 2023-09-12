import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
import courseRouter from "./router/courseRouter";

const app = express();

/**
 * CORS (Cross-Origin Resource Sharing)는 웹 페이지의 요청 도메인과 응답 도메인이 다를 때
 * 안전하게 요청을 처리할 수 있도록 하는 웹 브라우저의 보안 기술입니다.
 * 프론트 서버를 따로 사용시 (예: React, Vue 등) ALLOWED_ORIGINS 배열에 추가해야 합니다.
 */
const ALLOWED_ORIGINS = [
  "https://master--candid-halva-4d19f5.netlify.app", 
  "http://localhost:3000"
];
app.use(cors({
  origin: ALLOWED_ORIGINS,
  method: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,
}));

/**
 * express.json() 미들웨어를 사용하여 들어오는 요청의 JSON 본문을 파싱합니다.
 * 이를 통해 req.body로 JSON 데이터에 접근할 수 있습니다.
 */
app.use(express.json());

/**
 * express.urlencoded() 미들웨어는 URL-encoded 데이터를 파싱합니다.
 * 이 미들웨어는 폼 데이터(form data)를 처리할 때 주로 사용됩니다.
 */
app.use(express.urlencoded({ extended: true }));


app.use("/file", express.static("file"));

app.use("/api/users", userRouter);
app.use("/api/course", courseRouter);

export default app;
