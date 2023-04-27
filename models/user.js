import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  email: String,
  password: String,
});

export const UserModel = model("User", userSchema);
