"use server";

import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  //   Error Handling
  return await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
};
export const createTodoAction = async ({
  title,
  body,
  completed,
}: {
  title: string;
  body?: string | undefined;
  completed: boolean;
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
};
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};
export const updateTodoAction = async ({
  id,
  title,
  body,
  completed,
}: ITodo) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
};
