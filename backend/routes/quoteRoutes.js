import express from "express";
import { getQuotes } from "../controllers/quotesController.js";


export const quoteRouter = express.Router();
quoteRouter.get("/", getQuotes);