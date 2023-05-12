import express from "express";
import {
  logIn,
  signUp,
  getProfile,
  verifyToken,
  setPreferences,
  uploadProfileImage,
} from "../controllers/user.js";
import passport from "passport";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import multer from "multer";

cloudinary.config({
  api_key: "864812548614261",
  api_secret: "uTHhFr0aePc8dtMMX7jLqXfOVuw",
  cloud_name: "dbvkzlgoz",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "some-folder-name",
  },
});

const parser = multer({ storage: storage });

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

userRouter.post("/preferences", verifyToken, setPreferences);

userRouter.post(
  "/profile-image",
  verifyToken,
  parser.single("image"),
  uploadProfileImage
);

export default userRouter;
