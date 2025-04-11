import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import httpRequest from "@/api/request";
import DeleteConfirmation from "@/components/shared/deleteConf";
import UpdateSubTaskPopup from "@/components/parts/updateSubTask"; // Import the update popup component

interface SubTaskCardProps {
  taskId: string;
}

interface SubTask {
  _id: string;
  title: string;
  completed: boolean;
}

export default function SubTaskCard({ taskId }: SubTaskCardProps) {
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSubTask, setSelectedSubTask] = useState<SubTask | null>(null); // Store selected subtask for editing

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

  async function deleteSubTask(subtaskId: string) {
    try {
      await httpRequest.delete(`/data/delete-SubTask/${subtaskId}`, { data: { taskId } });
      setSubTasks((prev) => prev.filter((subtask) => subtask._id !== subtaskId));
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  }

  function handleSubTaskUpdate(updatedSubTask: SubTask) {
    setSubTasks((prev) =>
      prev.map((subtask) => (subtask._id === updatedSubTask._id ? updatedSubTask : subtask))
    );
  }

  return (
    <div className="space-y-4">
      {subTasks.map((subtask) => (
        <Card key={subtask._id} className="flex items-center justify-between p-4 w-full">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={() =>
                setSelectedSubTask({ ...subtask, completed: !subtask.completed })
              }
            />
            <span className={subtask.completed ? "line-through text-gray-500" : ""}>{subtask.title}</span>
          </div>
          <div className="flex gap-2">
            {/* Open Update Popup */}
            <Button size="icon" variant="outline" onClick={() => setSelectedSubTask(subtask)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => {
                setDeleteId(subtask._id);
                setIsDeleteOpen(true);
              }}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
      {/* Update Popup */}
      {selectedSubTask && (
        <UpdateSubTaskPopup
          subtask={selectedSubTask}
          onClose={() => setSelectedSubTask(null)}
          onUpdate={handleSubTaskUpdate}
        />
      )}
      {/* Delete Confirmation Popup */}
      <DeleteConfirmation
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        onConfirm={() => {
          if (deleteId) {
            deleteSubTask(deleteId);
          } else {
            console.error("Delete ID is not set.");
          }
        }}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}
