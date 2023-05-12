import { Schema, model } from "mongoose";

const subEventSchema = new Schema({
  name: { type: String, required: true },
  limit: { type: Number, required: true },
});

const eventSchema = Schema({
  type: { type: String, required: true },
  subEvent: [subEventSchema],
});

const categorySchema = Schema({
  name: { type: String, required: true },
  event: [eventSchema],
});

export const CategoryModel = model("Category", categorySchema);
