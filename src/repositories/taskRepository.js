const pool = require("../databaseConn/dbConnect");

//write only database queries here(this layer will talk to DbB)
const createTaskRepo = (setvalues) => {
  return pool.query(
    "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
    setvalues,
  );
};

const getTaskByIdRepo = (id) => {
  return pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
};
const getAllTasksRepo = (limit,offset) => {
  return  pool.query(
    "SELECT * FROM tasks ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );
};
const updateTaskByIdRepo = async (title, description, status, id) => {
  return pool.query(
    "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 RETURNING *",
    [title, description, status, id],
  );
};

const deleteTaskByIdRepo = (id) => {
  return pool.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [id]);
};
module.exports = {
  createTaskRepo,
  getTaskByIdRepo,
  getAllTasksRepo,
  updateTaskByIdRepo,
  deleteTaskByIdRepo,
};
