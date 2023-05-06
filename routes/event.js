import { createEvent, searchEvent } from "../controllers/event.js";
import express from "express";
import { verifyToken } from "../controllers/user.js";

export const eventRouter = express.Router();

eventRouter.post("/", verifyToken, createEvent);

eventRouter.get("/search", searchEvent);
