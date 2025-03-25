import express from "express";
import { createTask, getTasks, deleteTask, completeTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

export const taskRouter = express.Router();
taskRouter.post("/", protect, createTask);
taskRouter.get("/", protect, getTasks);
taskRouter.delete("/:id", protect, deleteTask);
taskRouter.patch("/complete/:id", protect, completeTask);

