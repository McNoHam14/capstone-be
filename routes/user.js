import express from "express";
import { logIn, signUp, getProfile, verifyToken } from "../controllers/user.js";
import passport from "passport";

const userRouter = express.Router();

userRouter.post("/signup", signUp);

userRouter.post("/login", logIn);

userRouter.get("/profile", verifyToken, getProfile);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  }),
  async (req, res, next) => {
    try {
      res.redirect(
        `${process.env.FE_DEV_URL}/main?accessToken=${req.user.accessToken}`
      );
      //   console.log(req.user.accessToken);
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
