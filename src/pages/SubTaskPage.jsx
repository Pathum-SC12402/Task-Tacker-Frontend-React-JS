import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // Import useParams and useLocation
import SubTask from "../components/subTask/subTask"; // Import SubTask component
import "../assets/styles/SubTaskPage.css"; // Import styles

const SubTaskPage = () => {
  const { taskId } = useParams(); // Extract taskId from URL
  const location = useLocation(); // Get passed state
  const [taskTitle, setTaskTitle] = useState(location.state?.title || "Untitled Task"); // Set title from state
  const [subtasks, setSubtasks] = useState([]); // Default empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!taskId) {
      setError("Invalid Task ID");
      setLoading(false);
      return;
    }

    const fetchSubtasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/data/get-subTask/${taskId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch subtasks: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data && data.subtasks) {
          setSubtasks(data.subtasks); // Update state with subtasks array
          setTaskTitle(data.title || taskTitle); // Update title if available from API
        } else {
          setSubtasks([]); // Ensure it's an empty array if no subtasks found
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubtasks();
  }, [taskId]); // Fetch only when taskId changes

  // Handle subtask deletion in the parent
  const handleDeleteSubtask = (deletedSubtaskId) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((subtask) => subtask._id !== deletedSubtaskId)
    );
  };

  return (
    <div className="subtask-page">
      <h2>Task List - {taskTitle}</h2> {/* Display task title dynamically */}

      {loading && <p className="loading">Loading subtasks...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && subtasks.length > 0 ? (
        <div className="subtask-list">
          {subtasks.map((subtask) => (
            <SubTask 
              key={subtask._id} 
              id={subtask._id} 
              title={subtask.title} 
              completed={subtask.completed} 
              taskId={taskId} // Pass taskId to SubTask
              onDelete={handleDeleteSubtask} // Pass onDelete callback to handle deletion
            />
          ))}
        </div>
      ) : (
        !loading && !error && <p className="no-subtasks">No subtasks available.</p>
      )}
    </div>
  );
};

export default SubTaskPage;
