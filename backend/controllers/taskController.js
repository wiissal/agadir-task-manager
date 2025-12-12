const db = require("../models");

const Task = db.Task;
const User = db.User;

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    const tasks = await Task.findAll({ where: { user_id: userId } });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const userId = req.userId;

    const task = await Task.create({
      user_id: userId,
      title,
      description,
      due_date,
      status: "pending",
    });

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.update({ title, description, due_date, status });

    res.json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};
