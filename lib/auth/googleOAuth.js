import GoogleStrategy from "passport-google-oauth20";
import { UserModel } from "../../models/user.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.API_URL}/users/auth/google/callback`,
  },
  async (_, __, profile, passportNext) => {
    try {
      const { email, given_name, family_name } = profile._json;
      console.log("PROFILE:", profile);

      const user = await UserModel.findOne({ email });
      if (user) {
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        passportNext(null, { accessToken });
      } else {
        const newUser = new UserModel({
          firstName: given_name,
          lastName: family_name,
          email,
          // googleId: sub,
        });

        await newUser.save();
        const accessToken = jwt.sign(
          { userId: newUser._id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        passportNext(null, { accessToken });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

export default googleStrategy;
