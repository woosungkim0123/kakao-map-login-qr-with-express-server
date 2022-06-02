"use strict";
import server from "../server";

// 서버 오픈 하는 곳

// .env를 이용해 코드 상 노출이 가능한 정보 숨기기
// const PORT = process.env.PORT;
const PORT = 9077;

server.listen(PORT, () =>
  console.log(`Local : http://localhost:${PORT}, Server : ""`)
);
