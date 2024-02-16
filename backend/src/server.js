const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { startDatabase } = require("./database");
const taskController = require("./controllers/taskController");
const userController = require("./controllers/userController");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());

startDatabase();

//Endpoints
app.post("/api/signup", (req, res) => {
  userController.signup(req, res);
});

app.post("/api/login", (req, res) => {
  userController.login(req, res);
});

app.post("/api/add-task", (req, res) => {
  taskController.createTask(req, res);
});

app.get("/api/get-tasks/:id", (req, res) => {
  taskController.getAllTasksByUserId(req, res);
});

app.get("/api/get-team-tasks", (req, res) => {
  taskController.getAllTeamTasks(req, res);
});

app.get("/api/get-personal-tasks/:id", (req, res) => {
  taskController.getAllPersonalTasks(req, res);
});

app.get("/api/get-task/:id", (req, res) => {
  taskController.getTaskById(req, res);
});

app.put("/api/edit-task/:id", (req, res) => {
  taskController.updateTask(req, res);
});

app.put("/api/complete-task/:id", (req, res) => {
  taskController.completeTask(req, res);
});

app.delete("/api/delete-task/:id", (req, res) => {
  taskController.deteleTaskById(req, res);
});

app.put("/api/undone-task/:id", (req, res) => {
  taskController.undoneTask(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
