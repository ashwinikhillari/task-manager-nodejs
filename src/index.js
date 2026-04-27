const express = require("express");
const pool = require('./databaseConn/dbConnect');
const logger = require("./middlewares/logger");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
app.use(express.json());
app.use(logger);  //logging http method, url ,timestamp
// test route
app.get("/", async (req, res) => {
   const result =  await pool.query('SELECT * FROM tasks');
 res.json(result.rows);

});


//actual code
app.use("/api", taskRoutes);
app.use((req, res) => {
  res.status(404).send({ message: "Requested Route is not found" });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});