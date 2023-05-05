import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.js";
import cors from "cors";
import { eventRouter } from "./routes/event.js";
import googleStrategy from "./lib/auth/googleOAuth.js";
import passport from "passport";

const app = express();

passport.use("google", googleStrategy);

app.use(express.json());
app.use(cors());

app.use(passport.initialize());

app.use("/users", userRouter);

app.use("/events", eventRouter);

const startServer = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(process.env.PORT, () => {
    console.log("Server is started");
  });
};

startServer();
