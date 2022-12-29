"use strict";
import "dotenv/config";
import "regenerator-runtime";
import app from "../app";

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.info(`서버가 열렸습니다. http://localhost:${PORT}`)
);
