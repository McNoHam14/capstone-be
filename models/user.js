import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  email: String,
  password: String,
  preferences: [
    { categoryName: String, eventName: String, limit: Number, name: String },
  ],
  image: String,
});

export const UserModel = model("User", userSchema);
