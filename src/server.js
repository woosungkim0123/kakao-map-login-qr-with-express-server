import express from "express";
import router from "./routers/main/main";

// 서버 객체 담기
const server = express();

// ejs 세팅
server.set("view engine", "ejs");
server.set("views", process.cwd() + "/src/views");

// 미들웨어 설정
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/client", express.static("src/client"));

// 라우터
server.use("/", router);

export default server;
