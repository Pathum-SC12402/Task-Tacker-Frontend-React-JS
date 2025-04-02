import { useState } from "react";
import { useLocation } from "react-router-dom";
import SubTaskCard from "@/components/parts/subTaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import httpRequest from "@/api/request";

export default function SubTaskPage() {
    const location = useLocation();
    const [taskId] = useState(location.state?.taskId ?? "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [subTasks, setSubTasks] = useState<{ _id: any; title: string; completed: boolean }[]>([]);

    // Handle adding a new subtask
    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            const response = await httpRequest.post(`/data/add-subTask/${taskId}`, {
                title: newTaskTitle,
                completed: isCompleted,
            });

            if (response.status === 201) {
                setSubTasks((prevSubTasks) => [
                    ...prevSubTasks,
                    { _id: response.data._id, title: newTaskTitle, completed: isCompleted }
                ]);
                setIsModalOpen(false);
                setNewTaskTitle("");
                setIsCompleted(false);
            }
        } catch (error) {
            console.error("Error adding subtask:", error);
        }
    };

    return (
        <div className="bg-gray-300 h-full container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Subtasks</h2>
                <Button onClick={() => setIsModalOpen(true)} variant="default">
                    Add Task
                </Button>
            </div>

            <SubTaskCard taskId={taskId} />

            {/* Add Task Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Subtask</DialogTitle>
                    </DialogHeader>

                    <Input
                        type="text"
                        placeholder="Enter subtask title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    
                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => setIsCompleted(!isCompleted)}
                        />
                        <span>Mark as completed</span>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddTask}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
