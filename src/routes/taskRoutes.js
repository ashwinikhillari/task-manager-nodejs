const express = require('express');
const router = express.Router();
const {createTask,getTaskById,updateTaskById,deleteTaskById} = require("../controllers/taskController");

router.post("/tasks",createTask);

router.get("/tasks/:id",getTaskById);

// router.get("/all-tasks",getAllTask);
router.put("/tasks/:id",updateTaskById);
router.delete("/tasks/:id",deleteTaskById);
module.exports = router;