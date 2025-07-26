import React from "react";
import "./Sidebar.css";

const Sidebar = ({ user, tasks }) => {
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <aside className="sidebar">
      <h3>{user.name || "User"}</h3>
      <p>{user.email}</p>
      <hr />
      <p><strong>Total Tasks:</strong> {tasks.length}</p>
      <p><strong>Completed:</strong> {completed}</p>
      <p><strong>Pending:</strong> {pending}</p>
    </aside>
  );
};

export default Sidebar;
