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
  await event.save();
  res.send(event);
};

export const searchEvent = async (req, res) => {
  const query = {};
  if (req.body.category) {
    query.category = req.body.category;
  }
  if (req.body.eventType) {
    query.eventType = req.body.eventType;
  }
  if (req.body.eventSubType) {
    query.eventSubType = req.body.eventSubType;
  }

  EventModel.find(query).then((events, err) => {
    if (err) throw err;
    console.log(events);
    res.send(events);
  });
};
