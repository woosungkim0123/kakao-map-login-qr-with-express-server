import express from "express";
import morgan from "morgan";
import mainRouter from "./router/mainRouter";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/client/views");

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/client", express.static("src/client"));
app.use("/file", express.static("file"));

app.use("/", mainRouter);

export default app;

