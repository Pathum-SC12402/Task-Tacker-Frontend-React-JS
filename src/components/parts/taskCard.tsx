import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, CheckCircleIcon, Pencil, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpdateTaskPopup from "@/components/parts/updateTask"; // Update Popup Component
import DeleteConfirmation from "@/components/parts/deleteConf"; // Delete Confirmation Popup
import { useNavigate } from "react-router-dom";
import httpRequest from "@/api/request";

interface TaskCardProps {
  taskId: string;
  date?: string;
  title?: string;
  totalSubtasks?: number;
  completedSubtasks?: number;
  onUpdate: (updatedTask: { title: string }) => void;
  onDelete: (taskId: string) => void;
  onView: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  taskId,
  date = new Date().toISOString().split("T")[0],
  title,
  totalSubtasks,
  completedSubtasks,
  onUpdate,
  onDelete,
}) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const completionPercentage = totalSubtasks
    ? Math.round(((completedSubtasks || 0) / totalSubtasks) * 100)
    : 0;

  function onView(taskId: string): void {
    navigate(`/Dashboard/tasks`, { state: { taskId } });
  }

  async function handleDelete(taskId: string ) {
    try {
      const response = await httpRequest.delete(`/data/delete-task/${taskId}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete task");
      }

      onDelete(taskId);
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <Card className="p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all">
      <div className="flex items-center space-x-2 text-sm">
        <CalendarIcon className="w-4 h-4" />
        <span>{date}</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-600 mt-2">{title}</h3>

      <p className="text-sm mt-1">
        {completedSubtasks} / {totalSubtasks} subtasks completed
      </p>
      <Progress value={completionPercentage} className="h-3 mt-2" />

      <div className="flex items-center justify-between mt-3">
        <p className="text-sm font-medium">{completionPercentage}%</p>
        {completionPercentage === 100 && (
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button size="icon" variant="outline" onClick={() => onView(taskId)} className="bg-green-500">
            <Eye className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => setIsUpdateOpen(true)}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="destructive" onClick={() => setIsDeleteOpen(true)}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      {/* Update Popup */} 
      {isUpdateOpen && (
        <UpdateTaskPopup
          taskId={taskId}
          currentTitle={title}
          onClose={() => setIsUpdateOpen(false)}
          onUpdate={onUpdate}
        />
      )}

      {/* Delete Confirmation Popup */}
      <DeleteConfirmation
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        onConfirm={() => handleDelete(taskId)}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </Card>
  );
};

export default TaskCard;
