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
  console.log("req.body", req.query);
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.eventType) {
    query.eventType = req.query.eventType;
  }
  if (req.query.eventSubType) {
    query.eventSubType = req.query.eventSubType;
  }

  EventModel.find(query).then((events, err) => {
    if (err) throw err;
    // console.log(events);
    res.send(events);
  });
};

export const bookEvent = async (req, res, next) => {
  const event = await EventModel.findById(req.params.eventId);
  event.participants.push(req.userId);
  await event.save();
  res.send(event);
};
