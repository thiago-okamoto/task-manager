const { database } = require("../database"); // Import the database instance

class Task {
  id; //number
  name; //string
  description; //string
  status; //string (A, C or D) Active, complete or deleted
  user_id; //number
  type; //string (all, personal) team or personal task
  priority; //number (1, 2 or 3) High, Medium, Low
  created_dt; //date
  updated_dt; //date

  constructor(
    id,
    name,
    description,
    status,
    user_id,
    type,
    priority,
    created_dt,
    updated_dt
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.user_id = user_id;
    this.type = type;
    this.priority = priority;
    this.created_dt = created_dt;
    this.updated_dt = updated_dt;
  }

  static async createTask(data) {
    return new Promise((resolve) => {
      try {
        const {
          name,
          description,
          user_id,
          type,
          priority,
          created_dt,
          updated_dt,
        } = data.task;
        const query =
          "INSERT INTO tasks (name, description, status, user_id, type, priority, created_dt, updated_dt) VALUES ?";
        const values = [
          [
            name,
            description,
            "A",
            user_id,
            type,
            priority,
            created_dt,
            updated_dt,
          ],
        ];
        database.query(query, [values], (err, result) => {
          if (err !== null) {
            throw err;
          }
          resolve();
        });
      } catch (error) {
        console.error("Error creating task:", error);
        resolve();
      }
    });
  }

  static async getAllTasksByUserId(id) {
    return new Promise((resolve) => {
      try {
        const query =
          "SELECT * FROM tasks WHERE status in ('A','C') and (user_id = ? OR type = 'Team') ORDER BY status ASC, priority ASC;";
        database.query(query, [id], (err, results) => {
          if (err !== null) {
            throw err;
          }
          resolve(results);
        });
      } catch (error) {
        console.error("Error geting all user`s tasks:", error);
        resolve([]);
      }
    });
  }

  static async getAllTeamTasks() {
    return new Promise((resolve) => {
      try {
        const query =
          "SELECT * FROM tasks WHERE status in ('A','C') and type = 'Team' ORDER BY status ASC, priority ASC;";
        database.query(query, (err, results) => {
          if (err !== null) {
            throw err;
          }
          resolve(results);
        });
      } catch (error) {
        console.error("Error geting all team tasks:", error);
        resolve([]);
      }
    });
  }

  static async getAllPersonalTasks(id) {
    return new Promise((resolve) => {
      try {
        const query =
          "SELECT * FROM tasks WHERE status in ('A','C') and user_id = ? AND type = 'Personal' ORDER BY status ASC, priority ASC;";
        database.query(query, [id], (err, results) => {
          if (err !== null) {
            throw err;
          }
          resolve(results);
        });
      } catch (error) {
        console.error("Error geting all user`s tasks:", error);
        resolve([]);
      }
    });
  }

  static async getTaskById(id) {
    return new Promise((resolve) => {
      try {
        const query =
          "SELECT * FROM tasks WHERE id = ? AND status in ('A','C')";
        database.query(query, [id], (err, result) => {
          if (err !== null) {
            throw err;
          }
          const ResultTask = result[0];
          console.log("RESULT 0: ", result[0]);
          resolve(ResultTask);
        });
      } catch (error) {
        console.error("Error geting task by id:", error);
        resolve(null);
      }
    });
  }

  static async updateTask(id, data) {
    return new Promise((resolve) => {
      try {
        const { name, description, type, priority, updated_dt } = data.task;

        const query =
          "UPDATE tasks SET name = ?, description = ?, type = ?, priority = ?, updated_dt = ? WHERE id = ?";

        database.query(
          query,
          [name, description, type, priority, updated_dt, id],
          (err, result) => {
            if (err !== null) {
              throw err;
            }
            resolve();
          }
        );
      } catch (error) {
        console.error("Error updating task:", error);
        resolve();
      }
    });
  }

  static async completeTask(id) {
    return new Promise((resolve) => {
      try {
        const query =
          "UPDATE tasks SET status = 'C' WHERE id = ? AND status <> 'D' ";
        database.query(query, [id], (err, result) => {
          if (err !== null) {
            throw err;
          }
          resolve();
        });
      } catch (error) {
        console.error("Error completing task:", error);
        resolve();
      }
    });
  }

  static async deleteTask(id) {
    return new Promise((resolve) => {
      try {
        const query =
          "UPDATE tasks SET status = 'D' WHERE id = ? AND status <> 'D' ";
        database.query(query, [id], (err, result) => {
          if (err !== null) {
            throw err;
          }
          resolve();
        });
      } catch (error) {
        console.error("Error deleting task:", error);
        resolve();
      }
    });
  }

  static async undoneTask(id) {
    return new Promise((resolve) => {
      try {
        const query =
          "UPDATE tasks SET status = 'A' WHERE id = ? AND status <> 'D' ";
        database.query(query, [id], (err, result) => {
          if (err !== null) {
            throw err;
          }
          resolve();
        });
      } catch (error) {
        console.error("Error reactivating task:", error);
        resolve();
      }
    });
  }
}

module.exports = Task;
