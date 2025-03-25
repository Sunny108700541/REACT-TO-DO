import express from "express";
import { getWeather } from "../controllers/weatherController.js";

export const weatherRouter = express.Router();
weatherRouter.get("/:cityName", getWeather);


