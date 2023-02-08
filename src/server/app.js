import cookieParser from "cookie-parser";
import express from "express";

import mainRouter from "./router/mainRouter";
import userRouter from "./router/userRouter";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/client/views");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/client", express.static("src/client"));
app.use("/file", express.static("file"));

app.use("/users", userRouter);
app.use("/", mainRouter);

export default app;
