import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="hero">
        <h1>Taskify</h1>
        <p className="tagline">Simplify your life, one task at a time.</p>
        <button className="cta-button" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </header>

      <section className="why-taskify">
        <h2>Why Taskify?</h2>
        <p>Taskify helps you stay focused, organized, and productive.</p>
        <ul>
          <li>🧠 Stay organized with smart task groups</li>
          <li>🕒 Schedule deadlines & get reminders</li>
          <li>📱 Works on all your devices</li>
        </ul>
      </section>

      <section className="features">
        <h2>Core Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>✅ Task Management</h3>
            <p>Create, update, and categorize your to-dos easily.</p>
          </div>
          <div className="feature-item">
            <h3>🔒 Secure Login</h3>
            <p>Your data is protected with robust authentication.</p>
          </div>
          <div className="feature-item">
            <h3>🌙 Dark Mode</h3>
            <p>Switch between light and dark themes effortlessly.</p>
          </div>
          <div className="feature-item">
            <h3>📊 Analytics</h3>
            <p>Track your productivity with smart insights (coming soon).</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Create a free account</li>
          <li>Add and organize your tasks</li>
          <li>Mark tasks complete as you go</li>
        </ol>
      </section>

      <section className="cta-footer">
        <h2>Ready to boost your productivity?</h2>
        <button className="cta-button" onClick={() => navigate("/register")}>
          Join Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
