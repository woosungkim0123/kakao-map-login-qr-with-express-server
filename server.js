const express = require("express");

const server = express();
const PORT = 9077;

server.set("view engine", "ejs");
server.set("views", process.cwd() + "/client/html");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/client", express.static("client"));

let db = [];
// db 체크
console.log(db);

server.get("/", function (req, res) {
  res.render("home");
});
server.get("/greet", function (req, res) {
  res.render("greet");
});
server.get("/course", function (req, res) {
  res.render("course", { db: db });
});
server.get("/qr", function (req, res) {
  res.render("qr");
});
server.post("/qr", function (req, res) {
  const type = req.body.type;
  if (db.indexOf(type) === -1) {
    db.push(type);
  }
  console.log(db);
  res.send({ success: true });
});

// 실습
//Allow CORS: Access-Control-Allow-Origin
server.get("/test", function (req, res) {
  res.render("test");
});

server.post("/ajax/query", function (req, res) {
  const apiKey = req.query.api_key;
  if (!apiKey || apiKey !== "node") {
    return res.send({ msg: "api키를 확인해주세요" });
  }
  return res.send({ msg: "성공하셨습니다" });
});
server.post("/ajax/body", function (req, res) {
  const getData = req.body.data;
  let msg = "여러분이 보낸 값은 " + getData + " 입니다.";
  return res.send({ msg: msg });
});

server.listen(PORT, function () {
  console.log("로컬서버오픈: http://localhost:" + PORT);
});
