"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { TodoFormValues, todoFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTodoAction } from "@/actions/todo.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Spinner from "./Spinner";
const AddTodoForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<TodoFormValues> = {
    title: "",
    body: "",
    completed: false,
  };
  //** getTodoListAction */
  // const todos = await getTodoListAction();

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async ({ title, body, completed }: TodoFormValues) => {
    setLoading(true);
    await createTodoAction({
      title,
      body,
      completed,
    });
    setLoading(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-end">
        <DialogTrigger asChild className="ml-auto">
          <Button>
            <Plus size={14} className="mr-1" />
            New Todo
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Go to gym" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can write a short description about your next todo .
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...field}
                      />
                    </FormControl>
                    <FormLabel>Completed</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner /> Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoForm;
