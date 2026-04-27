//Business logic in service layer
const repo = require("../repositories/taskRepository");

const createTaskService = async (request) => {
  const { title, description, status } = request;
  if (!title || title.trim() === "") {
    throw { status: 400, message: "Title field is required" };
  }
  const statusState = ["pending", "in-progress", "completed"];
  if (status && !statusState.includes(status)) {
    throw {
      status: 400,
      message: `Invalid task Status. Status must be 'pending' or 'in-progress' or 'completed'`,
    };
  }
  const setvalues = [title, description, status || "pending"];
  return await repo.createTaskRepo(setvalues);
};

const getTaskByIdService = async (req) => {
  const { id } = req.params;

  return await repo.getTaskByIdRepo(id);
};
const getAllTasksService = async (req) => {
  const { limit,page } = req.query;
  const offset = (page -1 ) * limit;
  
  const result = await repo.getAllTasksRepo(limit,offset);
  return {page,limit, tasks : result.rows}
};
const updateTaskByIdService = async (id, body) => {
  const { title, description, status } = body;

  const validStatus = ["pending", "in-progress", "completed"];

  if (status && !validStatus.includes(status)) {
    throw {
      status: 400,
      message: `Invalid task Status. Status must be 'pending' or 'in-progress' or 'completed'`,
    };
  }

  return await repo.updateTaskByIdRepo(title, description, status, id);
};

const deleteTaskByIdService = async (id) => {
  return await repo.deleteTaskByIdRepo(id);
};
module.exports = {
  createTaskService,
  getTaskByIdService,
  getAllTasksService,
  updateTaskByIdService,
  deleteTaskByIdService,
};
