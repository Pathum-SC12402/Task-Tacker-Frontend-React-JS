import { useState } from "react";
import httpRequest from "@/api/request";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UpdateTaskPopupProps {
  taskId: string;
  currentTitle?: string;
  onClose: () => void;
  onUpdate: (updatedTask: { title: string }) => void;
}

export default function UpdateTaskPopup({ taskId, currentTitle, onClose, onUpdate }: UpdateTaskPopupProps) {
  const [title, setTitle] = useState(currentTitle || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await httpRequest.put(`/data/update-Task/${taskId}`, { title });
      onUpdate({ title });
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Update Task</DialogTitle>
        <div className="space-y-4">
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter new task title" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={loading}>{loading ? "Updating..." : "Update"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
