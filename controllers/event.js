import { EventModel } from "../models/event.js";

export const createEvent = async (req, res, next) => {
  const { category, eventType, eventSubType, time, location, price } = req.body;
  const event = new EventModel({
    category,
    eventType,
    eventSubType,
    time,
    location,
    price,
    user: req.userId,
  });
  res.send(event);
};
