import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import httpRequest from "@/api/request";

interface DashboardPageProps {
  userId: string | null;
}

interface Task {
  taskTitle: string;
  taskStatus: string;
  taskDate: string;
}

export default function DashboardPage({ userId }: DashboardPageProps) {
  const [taskStats, setTaskStats] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0 });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [taskData, setTaskData] = useState<{ name: string; tasks: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    Promise.all([
      httpRequest.get(`/data/get-taskQty/${userId}`),
      httpRequest.get(`/data/get-recentTasks/${userId}`),
      httpRequest.get(`/data/get-subTasksQtyforThisWeek/${userId}`)
    ])
      .then(([taskQtyRes, recentTasksRes, weeklyTasksRes]) => {
        setTaskStats({
          totalTasks: taskQtyRes.data.totalTasks,
          completedTasks: taskQtyRes.data.completedTasks,
          pendingTasks: taskQtyRes.data.pendingTasks,
        });

        setRecentTasks(recentTasksRes.data.recentTasks);

        setTaskData(
          weeklyTasksRes.data.weekTaskData.map((entry: { day: string; count: number }) => ({
            name: entry.day,
            tasks: entry.count,
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p className="text-center text-lg">Loading dashboard...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Task Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Tasks" value={taskStats.totalTasks} color="text-red-500"/>
        <StatCard title="Completed" value={taskStats.completedTasks} color="text-green-500" />
        <StatCard title="Pending" value={taskStats.pendingTasks} color="text-yellow-500" />
      </div>

      {/* Recent Tasks Table */}
      <Card>
        <CardHeader><CardTitle>Recent Tasks</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTasks.length > 0 ? (
                recentTasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task.taskTitle}</TableCell>
                    <TableCell>
                      <Badge variant={
                        task.taskStatus === "Completed" ? "default" :
                        task.taskStatus === "In Progress" ? "secondary" : "destructive"
                      }>
                        {task.taskStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.taskDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={3} className="text-center">No recent tasks found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekly Task Progress Chart */}
      <Card>
        <CardHeader><CardTitle>Task Progress (Weekly)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taskData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="tasks" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable Card Component for Task Stats
const StatCard = ({ title, value, color = "text-black" }: { title: string; value: number; color?: string }) => (
  <Card>
    <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
    <CardContent>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </CardContent>
  </Card>
);
