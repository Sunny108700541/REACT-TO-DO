import { Task } from "../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({ userId: req.user.userId, ...req.body });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Tasks" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error Deleting Task" });
  }
};

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed : true }, {returnDocument: "after"} );
    res.json(task);
  } catch (error) {
    res.status(400).send("error : " + error.message);
  }
}
