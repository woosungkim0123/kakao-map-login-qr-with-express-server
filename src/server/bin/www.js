"use strict";
import "dotenv/config";
import "regenerator-runtime";
import app from "../app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.info(`Server Open :::::: http://localhost:${PORT}`)
);

