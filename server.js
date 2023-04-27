import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./routes/user.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

const startServer = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(process.env.PORT, () => {
    console.log("Server is started");
  });
};

startServer();
