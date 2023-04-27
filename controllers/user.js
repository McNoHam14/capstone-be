import { UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { firstName, lastName, birthDate, email, password } = req.body;
  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    return res.status(422).send("email already in use");
  }
  const user = new UserModel({
    firstName,
    lastName,
    birthDate,
    email,
    password,
  });
  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res.send({ user, token });
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (!user) {
    return res.status(422).send("incorrect credentials");
  }

  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res.send({ user, token });
};
