import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onClose, userId }) => {
  const [tasks, setTasks] = useState([]);  // Store the added tasks
  const [date, setDate] = useState("");     // Store the date
  const [title, setTitle] = useState("");   // Store the title for the current task
  const [subtasks, setSubtasks] = useState([{ title: "", completed: false }]); // Store subtasks
  
  // Function to handle adding a subtask (dynamically)
  const addSubtask = () => {
    setSubtasks([...subtasks, { title: "", completed: false }]);
  };

  // Function to handle subtask title change
  const handleSubtaskTitleChange = (index, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].title = value;
    setSubtasks(updatedSubtasks);
  };

  // Function to remove a subtask
  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const taskData = {
      userId,              // Use userId passed from the parent component (DashboardPage)
      date,                // The date entered in the input field
      title,               // The title entered for the task
      subtasks: subtasks.map(subtask => ({
        title: subtask.title,
        completed: subtask.completed,  // Include the completion status
      })),
    };

    try {
      const response = await fetch("http://localhost:8000/api/data/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),  // Send the data as JSON
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Task created successfully:", result);
        onClose();  // Close the popup on success
      } else {
        console.error("Failed to create task:", result);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        {/* Date input */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>

        {/* Title input for the task */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        {/* Display list of subtasks */}
        <div>
          <h4>Tasks</h4>
          <div className="task-list">
            {subtasks.map((subtask, index) => (
              <div key={index} className="subtask-item">
                <input
                  type="text"
                  value={subtask.title}
                  onChange={(e) => handleSubtaskTitleChange(index, e.target.value)}
                  placeholder="Enter subtask title"
                />
                <button className="delete-btn" onClick={() => removeSubtask(index)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
          <button className="add-subtask-btn" onClick={addSubtask}>Add Subtask</button>
        </div>

        {/* Submit button */}
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default TaskForm;
