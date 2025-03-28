import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import httpRequest from "@/api/request";

interface SubTaskCardProps {
  taskId: string;
}

interface SubTask {
  _id: string;
  title: string;
  completed: boolean;
}

interface UpdatedData {
  title?: string;
  completed?: boolean;
}

export default function SubTaskCard({ taskId }: SubTaskCardProps) { 
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);

  console.log("Task ID:", taskId); // Debugging

  useEffect(() => {
    async function fetchSubTasks() {
      try {
        const response = await httpRequest.get(`/data/get-subTask/${taskId}`);
        setSubTasks(response.data.subtasks);
      } catch (error) {
        console.error("Error fetching subtasks:", error);
      }
    }

    if (taskId) fetchSubTasks();
  }, [taskId]);

  async function updateSubTask(subtaskId: string, updatedData: UpdatedData) {
    try {
      await httpRequest.put(`/data/update-SubTask/${subtaskId}`, updatedData);
      setSubTasks((prev) =>
        prev.map((subtask) => (subtask._id === subtaskId ? { ...subtask, ...updatedData } : subtask))
      );
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  }

  async function deleteSubTask(subtaskId: string) {
    try {
      await httpRequest.delete(`/data/delete-Subtask/${subtaskId}`);
      setSubTasks((prev) => prev.filter((subtask) => subtask._id !== subtaskId));
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  }

  return (
    <div className="space-y-4">
      {subTasks.map((subtask) => (
        <Card key={subtask._id} className="flex items-center justify-between p-4 w-full">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={() => updateSubTask(subtask._id, { completed: !subtask.completed })}
            />
            <span className={subtask.completed ? "line-through text-gray-500" : ""}>{subtask.title}</span>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" onClick={() => updateSubTask(subtask._id, { title: "Updated Subtask Title" })}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="destructive" onClick={() => deleteSubTask(subtask._id)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
