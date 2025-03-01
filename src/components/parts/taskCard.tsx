import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, CheckCircleIcon } from "lucide-react";

interface TaskCardProps {
  date?: string;
  title?: string;
  totalSubtasks?: number;
  completedSubtasks?: number;
}

const TaskCard: React.FC<TaskCardProps> = ({
  date = new Date().toISOString().split("T")[0], // Default: Today's date
  title = "Untitled Task", // Default title
  totalSubtasks = 1, // Prevents division by zero
  completedSubtasks = 0, // Default: None completed
}) => {
  const completionPercentage = totalSubtasks ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  return (
    <Card className="p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all">
      {/* Date Section */}
      <div className="flex items-center space-x-2 text-sm">
        <CalendarIcon className="w-4 h-4" />
        <span>{date}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-600 mt-2">{title}</h3>

      {/* Task Progress */}
      <p className="text-sm mt-1">
        {completedSubtasks} / {totalSubtasks} subtasks completed
      </p>
      <Progress value={completionPercentage} className="h-3 mt-2" />

      {/* Completion Percentage */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm font-medium">{completionPercentage}%</p>
        {completionPercentage === 100 && (
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
