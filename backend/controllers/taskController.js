const db = require("../models");
const Task = db.Task;
const User = db.User;

exports.getTasks = async (req, res) => {
  try {
    const userId = req.used.id;
    const tasks = await task.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      message: "loading tasks succesfully",
      tasks,
    });
  } catch (error) {
    console.error("get taks error:", error);
    res.status(500).json({
      message: "failed to load tasks",
      error: error.message,
    });
  }
};
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, due_date } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "title is required",
      });
    }
    const newTask = await task.create({
      user_id: userId,
      title,
      description,
      due_date,
      status: "pending",
    });
    res.status(201).json({
      message: " task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("create task error", error);
    res.status(500).json({
      message: "failed to create task",
      error: error.message,
    });
  }
};
exports.undateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const task = await task.FindByPk(taskId);
    //check if task exist
    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }
    //check if the user own this task
    if (task.user_id !== userId) {
      return res.status(403).json({
        message: "Not authorized to update this task",
      });
    }
    // update task
    const { title, description, due_date, status } = req.body;
    await task.update({
      title: title || task.title,
      description: description || task.description,
      due_date: due_date || task.due_date,
      status: status || task.status,
    });
    res.status(200).json({
      message: "Task updated succesfully",
      task,
    });
  } catch (error) {
    console.error("update task error", error);
    res.status(500).json({
      message: "failed to update task",
      error: error.message,
    });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.param.id;
    const userId = req.user.id;
    const task = await task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    if (task.user_id !== userId) {
      return res.status(403).json({
        message: "not authorozed to delete this task",
      });
    }
    await task.destroy();
    res.status(200).json({
      message: "task deleted successfuly",
    });
  } catch (error) {
    console.error("delete task error", error);
    res.status(500).json({
      message: "failed to delete this task",
      error: error.message,
    });
  }
};
//mark it as done
exports.taskMarked = async (req, res) => {
  try {
    const taskId = req.param.id;
    const userId = req.user.id;
    const task = await task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }
    if (task.user_id !== userId) {
      return res.status(403).json({
        message: "not authorized",
      });
    }
    await task.update({ status: "done" });
    res.status(200).json({
      message: "task marked as done",
      task,
    });
  } catch (error) {
    console.error("task not marker error:", error);
    res.status(500).json({
      message: "failed to mark task done",
      error: error.message,
    });
  }
};
