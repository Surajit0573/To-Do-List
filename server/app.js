const express = require("express");
const cors = require("cors");
const {config} = require("dotenv")
config();
const app = express();
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173',process.env.CLIENT_URL]
}));
app.use(express.json());

let tasks = []; // In-memory store
let id = 1; // Task ID counter

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = { id: id++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task status
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.completed = !task.completed;
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
