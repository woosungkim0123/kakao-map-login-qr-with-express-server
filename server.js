const express = require("express");

const server = express();
const PORT = 3500;

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

server.listen(PORT, function () {
  console.log("로컬서버오픈: http://localhost:" + PORT);
});
