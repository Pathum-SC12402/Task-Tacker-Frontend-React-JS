import TaskCard from "@/components/parts/taskCard";

interface FuturePlanPageProps {
  userId: string | null;
}
export default function FuturePlanPage({ userId }: FuturePlanPageProps) {
  return (
    <div className="bg-gray-300 flex flex-col p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Future Plans</h1>
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
