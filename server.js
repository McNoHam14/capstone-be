import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./routes/user.js";
import cors from "cors";
import { eventRouter } from "./routes/event.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.use("/events", eventRouter);

const startServer = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(process.env.PORT, () => {
    console.log("Server is started");
  });
};

startServer();
