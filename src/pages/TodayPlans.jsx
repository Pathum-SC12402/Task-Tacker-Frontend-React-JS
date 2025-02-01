import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Card from "../components/card/card";
import "../assets/styles/TodayPlans.css";

const TodayPlans = ({ userId }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  // Function to fetch today's plans
  const fetchTodayPlans = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is missing");
      }

      console.log("Fetching today’s plans for user:", userId);
      const response = await fetch(`http://localhost:8000/api/data/get-TodayPlans/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch today's plans");
      }

      const data = await response.json();

      // Calculate total subtasks and completed subtasks for each plan
      const updatedPlans = data.map((plan) => {
        const totalSubtasks = plan.subtasks.length;
        const completedSubtasks = plan.subtasks.filter((subtask) => subtask.completed).length;

        // Format the date to YYYY-MM-DD (without time)
        const formattedDate = new Date(plan.date).toISOString().split("T")[0];

        return {
          ...plan,
          totalSubtasks,
          completedSubtasks,
          formattedDate, // Add the formatted date
        };
      });

      setPlans(updatedPlans); // Update the plans state with the calculated values
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle card click to navigate to SubTaskPage with task title
  const handleCardClick = (taskId, title) => {
    navigate(`/content/subtasks/${taskId}`, { state: { title } }); // Pass title as state
  };

  useEffect(() => {
    fetchTodayPlans();
  }, [userId]); // Re-fetch if userId changes

  return (
    <div>
      <h1>Today Plans</h1>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Show error if any */}
      {error && <p className="error">{error}</p>}

      {/* Show plans if available */}
      <div className="cards-container">
        {plans.length > 0 ? (
          plans.map((plan, index) => (
            <div key={index} onClick={() => handleCardClick(plan._id, plan.title)}>
              <Card
                date={plan.formattedDate} // Pass the formatted date
                title={plan.title}
                totalSubtasks={plan.totalSubtasks}
                completedSubtasks={plan.completedSubtasks}
              />
            </div>
          ))
        ) : (
          !loading && <p>No plans for today.</p>
        )}
      </div>
    </div>
  );
};

export default TodayPlans;
