import GoogleStrategy from "passport-google-oauth20";
import { UserModel } from "../../models/user.js";
import { createAccessToken } from "./tools.js";
import dotenv from "dotenv";
dotenv.config();

// require("dotenv").config();
// let dotenv = require("dotenv");

// require("dotenv").config();

// passport.use

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.API_URL}/users/auth/google/callback`,
  },
  async (_, __, profile, passportNext) => {
    try {
      const { email, first_name, last_name, sub } = profile._json;
      console.log("PROFILE:", profile);

      const user = await UserModel.findOne({ email });
      if (user) {
        const accessToken = await createAccessToken({
          _id: user._id,
          role: user.role,
        });
        passportNext(null, { accessToken });
      } else {
        const newUser = new UserModel({
          firstName: first_name,
          lastName: last_name,
          email,
          googleId: sub,
        });

        const createdUser = await newUser.save();
        const accessToken = await createAccessToken({
          _id: createdUser._id,
          role: createdUser.role,
        });
        passportNext(null, { accessToken });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

export default googleStrategy;
