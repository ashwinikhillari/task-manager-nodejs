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
  const { limit, page, title, status } = req.query;
  const offset = (page - 1) * limit;

  // to handle 3 condition try to manipulate query
  //query dynamic , setValues an array to use for palceholder $1 replicate array[0]
  let query = `SELECT * from tasks`;
  let setValues = [];
  let filters = [];
  if (title) {
    setValues.push(`%${title}%`);
    filters.push(`title ILIKE $${setValues.length}`);
  }
  if (status) {
    const validStatus = ["pending", "in-progress", "completed"];
    if (!validStatus.includes(status)) {
      throw { status: 400, message: "Invalid status used for filter" };
    }
    setValues.push(status);
    filters.push(`status = $${setValues.length}`);
  }

  if (filters.length > 0) {
    query += ` WHERE ${filters.join(" AND ")}`;
  }
  if (limit && page) {
    setValues.push(limit);
    setValues.push(offset);

    query += ` ORDER BY id LIMIT $${setValues.length - 1} OFFSET $${setValues.length}`;
  }
  console.log("Query whic is getting ", query);
  const result = await repo.getAllTasksRepo(query, setValues);

  return {
    page,
    limit,
    totalTasks: result.rows.length,
    tasks: result.rows,
  };
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
