import express from "express";
import Task from "../model/taskModel.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE task
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE task
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;