import TaskCard from "@/components/parts/taskCard";
import httpRequest from "@/api/request";
import { useState, useEffect } from "react";

interface FuturePlanPageProps {
  userId: string | null;
}
export default function FuturePlanPage({ userId }: FuturePlanPageProps) {
  interface Task {
    _id: string;
    date: string;
    title: string;
    subtasks: { completed: boolean }[];
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageId] = useState(3);

  const fetchTasks = async () => {
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    try {
      const response = await httpRequest.get(`/data/get-FuturePlans/${userId}`);

      if (response.data && Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
        setError(null);
      } else {
        setTasks([]);
        setError("No tasks available.");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);
  
  return (
    <div className="bg-gray-300 h-full rounded-md">
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Future Plans
        </h1>

        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available.</p>
        ) : (
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">      
              {tasks.map((task) => (
                <div>
                  <TaskCard
                    pageId={pageId}
                    key={task._id}
                    taskId={task._id}
                    date={new Date(task.date).toISOString().split("T")[0]}
                    title={task.title}
                    totalSubtasks={task.subtasks.length}
                    completedSubtasks={task.subtasks.filter((st) => st.completed).length}
                    onUpdate={() => fetchTasks()}
                    onDelete={() => fetchTasks()} 
                    onView={() => console.log(`View task ${task._id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
