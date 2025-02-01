import React from "react";
import "./card.css";

const TaskCard = ({ date, title, totalSubtasks, completedSubtasks }) => {
  const completionPercentage = totalSubtasks
    ? Math.round((completedSubtasks / totalSubtasks) * 100)
    : 0;

  return (
    <div className="task-card">
      <div className="task-date">{date}</div>
      <h3 className="task-title">{title}</h3>
      <p className="task-subtasks">
        {completedSubtasks} / {totalSubtasks} subtasks completed
      </p>
      <div className="task-progress">
        <div
          className="task-progress-bar"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <p className="task-percentage">{completionPercentage}%</p>
    </div>
  );
};

export default TaskCard;
