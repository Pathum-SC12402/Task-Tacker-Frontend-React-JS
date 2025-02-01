import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Card from "../components/card/card";
import "../assets/styles/TodayPlans.css";

const FuturePlans = ({ userId }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  // Function to fetch future plans
  const fetchFuturePlans = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is missing");
      }

      console.log("Fetching future plans for user:", userId);
      const response = await fetch(`http://localhost:8000/api/data/get-FuturePlans/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch future plans");
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Log the fetched data to inspect its structure

      // Check if the data is an array or contains a nested structure
      if (Array.isArray(data)) {
        setPlans(data); // If data is an array, directly set it
      } else if (data && data.tasks && Array.isArray(data.tasks)) {
        // If data contains a tasks array, set the plans from there
        setPlans(data.tasks);
      } else {
        throw new Error("Fetched data is not in the expected format");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate total and completed subtasks dynamically
  const calculateSubtasks = (subtasks) => {
    const totalSubtasks = subtasks.length;
    const completedSubtasks = subtasks.filter(subtask => subtask.completed).length;
    return { totalSubtasks, completedSubtasks };
  };

  // Handle card click to navigate to SubTaskPage with task title
  const handleCardClick = (taskId, title) => {
    navigate(`/content/subtasks/${taskId}`, { state: { title } }); // Pass title as state
  };

  useEffect(() => {
    fetchFuturePlans();
  }, [userId]); // Re-fetch if userId changes

  return (
    <div>
      <h1>Future Plans</h1>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Show error if any */}
      {error && <p className="error">{error}</p>}

      {/* Show plans if available */}
      <div className="cards-container">
        {plans.length > 0 ? (
          plans.map((plan, index) => {
            // Calculate total and completed subtasks for each plan
            const { totalSubtasks, completedSubtasks } = calculateSubtasks(plan.subtasks);

            return (
              <div key={index} onClick={() => handleCardClick(plan._id, plan.title)}>
                <Card
                  date={new Date(plan.date).toISOString().split("T")[0]} // Format the date
                  title={plan.title}
                  totalSubtasks={totalSubtasks}
                  completedSubtasks={completedSubtasks}
                />
              </div>
            );
          })
        ) : (
          !loading && <p>No future plans available.</p>
        )}
      </div>
    </div>
  );
};

export default FuturePlans;
