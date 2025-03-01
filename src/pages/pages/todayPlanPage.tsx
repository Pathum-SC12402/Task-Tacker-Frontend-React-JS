import TaskCard from "@/components/parts/taskCard";

export default function TodayPlanPage() {
  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Today's Plans</h1>

        {/* Grid Layout for Task Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
      </div>
    </div>
  );
}
