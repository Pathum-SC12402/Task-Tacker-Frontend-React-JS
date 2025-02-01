import React, { useState } from "react";
import "./SubTask.css"; // Optional styling

const SubTask = ({ id, title, completed, taskId, onDelete }) => { // Add taskId prop
  const [isCompleted, setIsCompleted] = useState(completed);
  const [error, setError] = useState(null);

  const handleCheckboxChange = async () => {
    setIsCompleted((prev) => !prev); // Optimistically update UI
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/data/update-SubTask/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !isCompleted }),
      });

      if (!response.ok) {
        throw new Error("Failed to update subtask status");
      }
    } catch (error) {
      console.error("Error updating subtask:", error);
      setIsCompleted((prev) => !prev); // Revert on failure
      setError("Failed to update");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/data/delete-Subtask/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: taskId }), // Include taskId in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to delete subtask");
      }

      onDelete(id); // Call onDelete in parent to remove from the list
    } catch (error) {
      console.error("Error deleting subtask:", error);
      setError("Failed to delete");
    }
  };

  return (
    <div className="subtask">
      <span className={`subtask-title ${isCompleted ? "completed" : ""}`}>{title}</span>
      <input type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
      <button className="delete-btn" onClick={handleDelete}>🗑</button>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default SubTask;
