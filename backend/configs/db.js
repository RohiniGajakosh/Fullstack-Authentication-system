const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

module.exports = pool;

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Database connected successfully");
    conn.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

