import { useState } from "react";
import httpRequest from "@/api/request";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface SubTask {
  _id: string;
  title: string;
  completed: boolean;
}

interface UpdateSubTaskPopupProps {
  subtask: SubTask;
  onClose: () => void;
  onUpdate: (updatedSubTask: SubTask) => void;
}

export default function UpdateSubTask({ subtask, onClose, onUpdate }: UpdateSubTaskPopupProps) {
  const [title, setTitle] = useState(subtask.title);
  const [completed, setCompleted] = useState(subtask.completed);
  const [loading, setLoading] = useState(false);
  
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedData = { title, completed };
      await httpRequest.put(`/data/update-SubTask/${subtask._id}`, updatedData);
      onUpdate({ ...subtask, ...updatedData });
      onClose();
    } catch (error) {
      console.error("Error updating subtask:", error);
      alert("Failed to update subtask.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Update Subtask</DialogTitle>
        <div className="space-y-4">
          <Input type="text" placeholder="Subtask Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="flex items-center gap-2">
            <Checkbox id="completed" checked={completed} onCheckedChange={(checked) => setCompleted(checked === true)} />
            <label htmlFor="completed">Completed</label>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={loading}>{loading ? "Updating..." : "Update"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
