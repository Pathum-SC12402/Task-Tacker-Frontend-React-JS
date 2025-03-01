import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddPlansPage() {
  const [subtasks, setSubtasks] = useState<Subtask[]>([{ value: "" }]);

  interface Subtask {
    value: string;
  }

  const addSubtask = () => {
    setSubtasks([...subtasks, { value: "" }]);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks: Subtask[] = [...subtasks];
    updatedSubtasks[index] = { value };
    setSubtasks(updatedSubtasks);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="max-h-[70vh] overflow-y-auto">
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <Input type="text" placeholder="YYYY-MM-DD" />
            </div>
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input type="text" placeholder="Enter task title" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Tasks</h4>
              <ScrollArea className="border rounded-md p-2">
                <div className="space-y-2">
                  {subtasks.map((subtask, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={subtask.value}
                        onChange={(e) => handleSubtaskChange(index, e.target.value)}
                        placeholder="Enter subtask title"
                      />
                      <Button
                        variant="destructive"
                        onClick={() => setSubtasks(subtasks.filter((_, i) => i !== index))}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button className="mt-2 w-full" variant="outline" onClick={addSubtask}>
                Add Subtask
              </Button>
            </div>
            <Button className="w-full">Submit</Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
