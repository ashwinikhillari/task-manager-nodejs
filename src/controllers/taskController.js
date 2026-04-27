//fire query
const pool = require("../databaseConn/dbConnect");
const service = require("../services/taskService");

const catchBlock = (err) => {
  if (err.status) {
    return { status: err.status, message: err.message };
  }
  return { status: 500, message: "Internal Server Error" };
};

const createTask = async (req, res) => {
  try {
    const result = await service.createTaskService(req.body);

    return res
      .status(201)
      .json({ message: `Task created successfully id : ${result.rows[0].id}` });
  } catch (error) {
    const { status, message } = catchBlock(error);
    return res.status(status).json({ message: message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const result = await service.getTaskByIdService(req);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `Task id= ${id} not found` });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const result = await service.getAllTasksService(req);
    res.json(result);
  } catch (error) {
   const { status, message } = catchBlock(error);
    return res.status(status).json({ message: message });
  }
};
const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await service.updateTaskByIdService(id, req.body);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Task with id = ${id} is not found ` });
    }

    res.json({ message: `Task with id=${id} is updated successfully.` });
  } catch (error) {
    const { status, message } = catchBlock(error);
    return res.status(status).json({ message: message });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await service.deleteTaskByIdService(id);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Task with id = ${id} is not found ` });
    }

    res.json({ message: `Task deleted successfully : task id ${id}` });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { createTask, getTaskById, getAllTasks,updateTaskById, deleteTaskById };
