import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import "./App.css";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    const theme = localStorage.getItem("darkMode") === "true";
    setTasks(saved);
    setDarkMode(theme);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("darkMode", darkMode);
  }, [tasks, darkMode]);

  function addTask() {
    if (taskInput.trim() === "") return;
    const newTask = {
      id: Date.now(),
      name: taskInput,
      dueDate: dueDate || null,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
    setTaskInput("");
    setDueDate("");
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  function toggleComplete(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function updateTask(id, updatedName, updatedDate) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, name: updatedName, dueDate: updatedDate }
          : task
      )
    );
  }

  function toggleTheme() {
    setDarkMode(prev => !prev);
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={`main-body ${darkMode ? "dark" : ""}`}>
      <div className="todo-list-mainDiv">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>My To-do List</h1>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="todo-task-input-div">
          <input
            type="text"
            className="form-control"
            placeholder="Task name"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="btn btn-primary" id="add-button" onClick={addTask}>
            +
          </button>
        </div>

        <div className="progress my-3">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>

        <h4 className="text-center">Your Tasks</h4>
        <ul className="tasks-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              updateTask={updateTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
