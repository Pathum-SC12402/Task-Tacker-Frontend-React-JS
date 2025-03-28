import { useState as ReactUseState, useState } from "react";
import { useLocation } from "react-router-dom";
import SubTaskCard from "@/components/parts/subTaskCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import httpRequest from "@/api/request";

export default function SubTaskPage() {
    const location = useLocation();
    const [taskId] = ReactUseState(location.state?.taskId ?? "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    // Function to handle adding a new subtask
    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            await httpRequest.post(`/data/add-subTask/${taskId}`, {
                title: newTaskTitle,
                completed: isCompleted,
            });

            // Close modal & reset inputs
            setIsModalOpen(false);
            setNewTaskTitle("");
            setIsCompleted(false);

            // Reload the page to reflect new changes (or use state updates)
            window.location.reload();
        } catch (error) {
            console.error("Error adding subtask:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Header with Add Task button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Subtasks</h2>
                <Button onClick={() => setIsModalOpen(true)} variant="default">
                    Add Task
                </Button>
            </div>

            {/* SubTask List */}
            <SubTaskCard taskId={taskId} />

            {/* Add Task Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a New Subtask</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input 
                            placeholder="Enter subtask title..." 
                            value={newTaskTitle} 
                            onChange={(e) => setNewTaskTitle(e.target.value)} 
                        />
                        <div className="flex items-center gap-2">
                            <Checkbox checked={isCompleted} onCheckedChange={() => setIsCompleted(!isCompleted)} />
                            <label>Mark as Completed</label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>Add Task</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
