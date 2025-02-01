import React, { useState } from "react";
import "../assets/styles/dashboard.css";
import TaskForm from "../components/taskForm/TaskForm";

function DashboardPage({ userId }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <h1 className="dashboard-header">Dashboard</h1>
      <div className="dashboard-container">
        <button className="add-plan-btn" onClick={() => setShowPopup(true)}>
          Add Plan
        </button>
      </div>

      {/* Pass userId to TaskForm */}
      {showPopup && <TaskForm userId={userId} onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default DashboardPage;
