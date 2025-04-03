import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardPageProps {
  userId: string | null;
}

export default function DashboardPage({ userId }: DashboardPageProps) {
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  interface Task {
    taskTitle: string;
    taskStatus: string;
    taskDate: string;
  }

  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [taskData, setTaskData] = useState<{ name: string; tasks: number }[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/data/get-taskQty/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setTaskStats({
            totalTasks: data.totalTasks,
            completedTasks: data.completedTasks,
            pendingTasks: data.pendingTasks,
          });
        })
        .catch((error) => console.error("Error fetching task data:", error));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/data/get-recentTasks/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setRecentTasks(data.recentTasks);
        })
        .catch((error) => console.error("Error fetching recent tasks:", error));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/data/get-subTasksQtyforThisWeek/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setTaskData(
            data.weekTaskData.map((entry: { day: string; count: number }) => ({
              name: entry.day,
              tasks: entry.count,
            }))
          );
        })
        .catch((error) => console.error("Error fetching weekly task data:", error));
    }
  }, [userId]);

  return (
    <div className="p-4 space-y-4 over">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{taskStats.totalTasks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">{taskStats.completedTasks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-500">{taskStats.pendingTasks}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
        </CardHeader>
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
              {recentTasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.taskTitle}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.taskStatus === "Completed"
                          ? "default"
                          : task.taskStatus === "In Progress"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {task.taskStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.taskDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Progress (Weekly)</CardTitle>
        </CardHeader>
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
