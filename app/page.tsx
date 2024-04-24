import AddTodoForm from "../components/AddTodoForm";
import { getTodoListAction } from "../actions/todo.actions";
import { TodoTable } from "@/components/TodoTable";

export default async function Home() {
  const todos = await getTodoListAction();
  return (
    <main>
      <AddTodoForm />
      <TodoTable todos={todos} />
    </main>
  );
}
