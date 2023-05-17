import mongoose from "mongoose";
import { EventModel } from "../models/event.js";

export const createEvent = async (req, res, next) => {
  const {
    category,
    eventType,
    eventSubType,
    time,
    location,
    price,
    booked,
    limit,
  } = req.body;
  const event = new EventModel({
    category,
    eventType,
    eventSubType,
    time,
    location,
    price,
    user: req.userId,
    booked,
    limit,
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

export const findMyEvents = async (req, res, next) => {
  const { type } = req.query;
  console.log("type", type);
  if (type === "my")
    EventModel.find({
      user: req.userId,
    }).then((events, err) => {
      // if (err) throw err;
      console.log(events);
      res.send(events);
    });
  else
    EventModel.find({
      participants: { $in: [req.userId] },
    }).then((events, err) => {
      // if (err) throw err;
      console.log(events);
      res.send(events);
    });
};

export const getNearbyEvents = async (req, res, next) => {
  const { lat, lng } = req.query;
  const events = await EventModel.find({
    location: {
      $near: {
        $maxDistance: 2500,
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
    },
  });
  res.send(events);
};
