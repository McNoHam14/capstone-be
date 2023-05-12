import express from "express";
import { addCategory } from "../controllers/category.js";

export const categoryRouter = express.Router();

categoryRouter.post("/add", addCategory);
