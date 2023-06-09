import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  category: String,

  eventType: String,

  eventSubType: String,

  time: Date,

  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  price: Number,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  booked: {
    type: Number,
    // required: true,
  },

  limit: {
    type: Number,
    // required: true,
  },
});

eventSchema.index({
  location: "2dsphere",
});

export const EventModel = model("Event", eventSchema);
