const express = require("express");
const router = express.Router();
const {
  createTask,
  getTaskById,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskController");

router.post("/tasks", createTask);


router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getTaskById);



router.put("/tasks/:id", updateTaskById);

router.delete("/tasks/:id", deleteTaskById);

module.exports = router;
