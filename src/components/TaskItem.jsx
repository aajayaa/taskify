import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, editId, editTitle, setEditTitle, setEditId, updateTask, deleteTask, toggleComplete }) => {
  return (
    <li className={`task-card ${task.completed ? 'completed' : ''}`}>
  {editId === task._id ? (
    <>
      <input
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <button onClick={() => updateTask(task._id)}>💾</button>
      <button onClick={() => setEditId(null)}>❌</button>
    </>
  ) : (
    <>
      <span
        onClick={() => toggleComplete(task)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
          flex: 1,
        }}
      >
        {task.title}
      </span>
      <div className="actions">
        <button onClick={() => toggleComplete(task)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => setEditId(task._id)}>✏️</button>
        <button onClick={() => deleteTask(task._id)}>🗑️</button>
      </div>
    </>
  )}
</li>

  );
};

export default TaskItem;
