import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { jwtDecode } from "jwt-decode";
import Toast from "../components/Toast";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import TaskItem from "../components/TaskItem";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ name: decoded.name, email: decoded.email });
      console.log("User decoded from token:", decoded);
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch {
      showToast("Failed to fetch tasks");
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await axios.post(
        "/api/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      showToast("Task created!");
    } catch {
      showToast("Failed to create task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      showToast("Task deleted");
    } catch {
      showToast("Failed to delete");
    }
  };

  const updateTask = async (id) => {
    try {
      const res = await axios.put(
        `/api/tasks/${id}`,
        { title: editTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditId(null);
      setEditTitle("");
      showToast("Task updated!");
    } catch {
      showToast("Failed to update");
    }
  };

  const toggleComplete = async (task) => {
  try {
    const res = await axios.put(
      `/api/tasks/${task._id}`,
      { title: task.title, completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    showToast(task.completed ? "Marked as pending" : "Completed!");
  } catch {
    showToast("Failed to update status");
  }
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "completed"
      ? task.completed
      : filter === "pending"
      ? !task.completed
      : true
  );

  return (
    <div className="dashboard">
      <Toast message={toast} onClose={() => setToast("")} />
      <Navbar onLogout={handleLogout} />
      <div className="dashboard-content">
        <Sidebar user={user} tasks={tasks} />
        <main className="main-area">
          <form onSubmit={createTask} className="task-form">
            <input
              type="text"
              placeholder="Enter new task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>

          <div className="filter-controls">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
            <button onClick={() => setFilter("pending")}>Pending</button>
          </div>

          <ul className="task-list">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                editId={editId}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                setEditId={setEditId}
                updateTask={updateTask}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
              />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
