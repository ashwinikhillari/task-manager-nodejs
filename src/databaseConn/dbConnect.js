const { Pool } = require('pg');

// Configure pg Admin database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task_management',
  password: 'Ganesh@1234',
  port: 5432,
});

module.exports = pool;
