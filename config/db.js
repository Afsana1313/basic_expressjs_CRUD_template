// ============================================
//   config/db.js  —  Database Connection
// ============================================
//
//   This file creates a "pool" of connections
//   to MySQL. A pool is better than a single
//   connection because it handles multiple
//   requests at the same time efficiently.
// ============================================

const mysql = require("mysql2");

// Read database credentials from .env file
const pool = mysql.createPool({
  host: process.env.DB_HOST, // usually 'localhost'
  user: process.env.DB_USER, // usually 'root'
  password: process.env.DB_PASSWORD, // your MySQL password
  database: process.env.DB_NAME // your database name
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.log("\n❌ Database connection failed");
    console.log("Message:", err.message);
    console.log("Code:", err.code);
    console.log("SQL State:", err.sqlState);
    console.log("Full Error:", err);
    return;
  }

  console.log("\n✅ MySQL Connected Successfully!");
  connection.release();
});
// .promise() lets us use async/await instead of callbacks
module.exports = pool.promise();
