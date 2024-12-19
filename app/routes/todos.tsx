import { Outlet } from "react-router";
import type { Route } from "./+types/todos";

export async function loader() {
  const res = await fetch("http://localhost:3000/todos");
  const todos = await res.json();
  return {
    total: todos.length,
    completed: todos.filter((it) => it.completed).length,
  };
}

export default function TodoLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-auto max-w-screen-lg py-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold my-4">Todo List</h2>
      <div className="flex flex-row gap-4">
        <p className="font-semibold">Summary</p>
        <p>Completed: {loaderData.completed}</p>
        <p>Total: {loaderData.total}</p>
      </div>
      <Outlet />
    </div>
  );
}
