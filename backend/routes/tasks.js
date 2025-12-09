const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");

// GET all tasks
router.get("/", authMiddleware, taskController.getTasks);

// CREATE task
router.post("/", authMiddleware, taskController.createTask);

// UPDATE task
router.put("/:id", authMiddleware, taskController.updateTask);

// DELETE task
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;