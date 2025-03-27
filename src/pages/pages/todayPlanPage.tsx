import { useEffect, useState } from "react";
import TaskCard from "@/components/parts/taskCard";
import httpRequest from "@/api/request";

interface TodayPlanPageProps {
  userId: string | null;
}

export default function TodayPlanPage({ userId }: TodayPlanPageProps) {
  interface Task {
    _id: string;
    date: string;
    title: string;
    subtasks: { completed: boolean }[];
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await httpRequest.get(`/data/get-TodayPlans/${userId}`);
        console.log("Full API Response:", response.data);

        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          setError("No tasks found");
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  return (
    <div className="bg-gray-300 h-full rounded-md">
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Today's Plans
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
                <TaskCard
                  key={task._id}
                  date={new Date(task.date).toISOString().split("T")[0]}
                  title={task.title}
                  totalSubtasks={task.subtasks.length}
                  completedSubtasks={task.subtasks.filter((st) => st.completed).length}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
