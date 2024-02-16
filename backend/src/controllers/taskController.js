const Task = require("../models/Task");
const User = require("../models/User");

module.exports.createTask = async (req, res) => {
  try {
    const task = req.body;
    console.log("Req", req.body);
    console.log("Data validation", task);

    Task.createTask(task);

    return res.status(201).json({
      code: "success",
      message: "Task created",
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllTasksByUserId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tasks = await Task.getAllTasksByUserId(id);

    const tasksWithUser = await Promise.all(
      tasks.map(async (task) => {
        const user = await User.getUserById(task.user_id);
        task.user = {
          name: user.name,
        };

        //set priority names
        if (task.priority == 1) {
          task.priority_name = "High";
        } else if (task.priority == 2) {
          task.priority_name = "Medium";
        } else if (task.priority == 3) {
          task.priority_name = "Low";
        }

        return task;
      })
    );

    return res.status(200).json({
      code: "success",
      message: "Tasks retrieved successfully",
      tasks: tasksWithUser, // Include tasks data in the response
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllTeamTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTeamTasks();

    const tasksWithUser = await Promise.all(
      tasks.map(async (task) => {
        const user = await User.getUserById(task.user_id);
        task.user = {
          name: user.name,
        };

        //set priority names
        if (task.priority == 1) {
          task.priority_name = "High";
        } else if (task.priority == 2) {
          task.priority_name = "Medium";
        } else if (task.priority == 3) {
          task.priority_name = "Low";
        }

        return task;
      })
    );

    return res.status(200).json({
      code: "success",
      message: "Tasks retrieved successfully",
      tasks: tasksWithUser, // Include tasks data in the response
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllPersonalTasks = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tasks = await Task.getAllPersonalTasks(id);

    const tasksWithUser = await Promise.all(
      tasks.map(async (task) => {
        const user = await User.getUserById(task.user_id);
        task.user = {
          name: user.name,
        };

        //set priority names
        if (task.priority == 1) {
          task.priority_name = "High";
        } else if (task.priority == 2) {
          task.priority_name = "Medium";
        } else if (task.priority == 3) {
          task.priority_name = "Low";
        }

        return task;
      })
    );

    return res.status(200).json({
      code: "success",
      message: "Tasks retrieved successfully",
      tasks: tasksWithUser, // Include tasks data in the response
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.getTaskById(id);
    return res.status(201).json({
      code: "success",
      message: "Task found",
      task: task,
    });
  } catch (error) {
    console.error("Error finding task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const task = req.body;
    const id = parseInt(req.params.id);
    console.log("Req", req.body);
    console.log("Data validation", task);

    Task.updateTask(id, task);

    return res.status(201).json({
      code: "success",
      message: "Task updated",
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.completeTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    Task.completeTask(id);

    return res.status(201).json({
      code: "success",
      message: "Task Done",
    });
  } catch (error) {
    console.error("Error completing task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deteleTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("Req", req.params);
    console.log("Data validation ID", id);

    Task.deleteTask(id);

    return res.status(201).json({
      code: "success",
      message: "Task deleted",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.undoneTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    Task.undoneTask(id);

    return res.status(201).json({
      code: "success",
      message: "Task undone",
    });
  } catch (error) {
    console.error("Error reactivating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
