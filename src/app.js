import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
import courseRouter from "./router/courseRouter";

const app = express();

app.use(cors({
  origin: ["https://master--candid-halva-4d19f5.netlify.app", "http://localhost:3000"],
  method: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/file", express.static("file"));

app.use("/api/users", userRouter);
app.use("/api/course", courseRouter);

export default app;
