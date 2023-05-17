import {
  createEvent,
  searchEvent,
  bookEvent,
  findMyEvents,
  getNearbyEvents,
} from "../controllers/event.js";
import express from "express";
import { verifyToken } from "../controllers/user.js";

export const eventRouter = express.Router();

eventRouter.post("/", verifyToken, createEvent);

eventRouter.get("/search", searchEvent);

eventRouter.post("/:eventId/book", verifyToken, bookEvent);

eventRouter.get("/my/events", verifyToken, findMyEvents);

eventRouter.get("/nearby", getNearbyEvents);
