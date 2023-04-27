import express from "express";
import { logIn, signUp } from "../controllers/user.js";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);

userRouter.post("/login", logIn);
