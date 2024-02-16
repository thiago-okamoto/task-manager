//import mysql from "mysql";
const mysql = require("mysql");

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootPass",
  database: "task_manager_db",
});

// Export the database connection instance
module.exports.database = db;

//type Promise<void>
module.exports.startDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.warn("Error connecting to MySQL:", err);
        reject(err);
      } else {
        console.log("Connected to MySQL");
        resolve();
      }
    });
  });
};
