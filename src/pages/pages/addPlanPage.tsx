"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Validation Schema
const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  title: z.string().min(1, "Title is required"),
  subtasks: z.array(
    z.object({
      value: z.string(),
    })
  ),
})

type FormValues = z.infer<typeof formSchema>

export default function AddPlansPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      title: "",
      subtasks: [{ value: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  })

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data)
  }

  // Prevent body scroll when the form is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="flex justify-center items-cente bg-opacity-50 p-4">
      <div className="w-full max-w-md bg-background rounded-lg border-2 shadow-lg max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex-1 p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Date Input */}
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

              {/* Title Input */}
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

              {/* Subtasks */}
              <FormField
                control={form.control}
                name="subtasks"
                render={() => (
                  <FormItem>
                    <FormLabel>Tasks</FormLabel>
                    <FormControl>
                      <ScrollArea className="border rounded-md p-2 max-h-[22vh] overflow-y-auto">
                        <div className="space-y-2">
                          {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center space-x-2">
                              <FormField
                                control={form.control}
                                name={`subtasks.${index}.value`}
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
                      onClick={() => append({ value: "" })}
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
  )
}
