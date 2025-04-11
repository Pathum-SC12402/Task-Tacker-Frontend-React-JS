"use client";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import httpRequest from "@/api/request";

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  title: z.string().min(1, "Title is required"),
  subtasks: z.array(
    z.object({
      title: z.string().min(1, "Subtask title is required"),
      completed: z.boolean().default(false),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface addPlanPageProps {
  userId: string | null;
}

export default function AddPlansPage({ userId }: addPlanPageProps) {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      title: "",
      subtasks: [{ title: "", completed: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const onSubmit = async (data: FormValues) => {
    try {
        await httpRequest.post("/data/create-task", {
        userId,
        date: data.date,
        title: data.title,
        subtasks: data.subtasks,
      });
      form.reset();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-full rounded-md">
      <div className="flex justify-center items-center bg-opacity-50 p-4">
        <div className="w-full max-w-md rounded-lg border shadow-lg max-h-[90vh] flex flex-col overflow-hidden">
          <div className="flex-1 p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtasks"
                  render={() => (
                    <FormItem>
                      <FormLabel>Subtasks</FormLabel>
                      <FormControl>
                        <ScrollArea className="border rounded-md p-2 max-h-[22vh] overflow-y-auto">
                          <div className="space-y-2">
                            {fields.map((field, index) => (
                              <div key={field.id} className="flex items-center space-x-2">
                                <FormField
                                  control={form.control}
                                  name={`subtasks.${index}.title`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input placeholder="Enter subtask title" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={() => remove(index)}
                                  className="shrink-0"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </FormControl>
                      <Button
                        type="button"
                        className="mt-2 w-full"
                        variant="outline"
                        onClick={() => append({ title: "", completed: false })}
                      >
                        Add Subtask
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}