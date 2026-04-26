//fire query 
const pool = require('../databaseConn/dbConnect');
const createTask = async(req,res)=>{
    try{
      const {title,description,status} = req.body;
      if(!title || title.trim()===""){
        return res.status(400).json({message:"Title field is required"})
      }
      const statusState = ['pending','in-progress','completed']
      if(status && !statusState.includes(status)){
        return res.status(400).json({message:`Invalid task Status. Status must be 'pending' or 'in-progress' or 'completed'`})
      }
      const setvalues = [title, description,status || 'pending']
      const result = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3)",setvalues
    );
      return res.status(201).json({message:"Task is created "})
    }catch{
      return res.status(500).json({message:"Internal Server Error"})
    }

}

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const validStatus = ["pending", "in-progress", "completed"];

    if (status && !validStatus.includes(status)) {
      return res.status(400).json({message:`Invalid task Status. Status must be 'pending' or 'in-progress' or 'completed'`})
       }

    const result = await pool.query(
      "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 RETURNING *",
      [title, description, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `Task with id = ${id} is not found `});
    }

    res.json({message:`Task with id=${id} is updated successfully.`});
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `Task with id = ${id} is not found ` });
    }

    res.json({ message: `Task deleted successfully : task id ${id}` });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {createTask,getTaskById,updateTaskById,deleteTaskById};
