import { Form, redirect, useFetcher } from "react-router";
import type { Route } from "./+types/todos._index";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export async function loader() {
  const todos = await fetch("http://localhost:3000/todos");
  return (await todos.json()) as {
    id: number;
    title: string;
    completed: boolean;
  }[];
}

export async function action({ request }: Route.ActionArgs) {
  const input = await request.formData();
  const res = await fetch("http://localhost:3000/todos", {
    method: "post",
    body: JSON.stringify({
      title: input.get("title"),
      completed: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 201) return redirect("/todos");
  throw new Response("Bad Request", { status: 400 });
}

export default function Todos({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Form method="POST">
        <Label htmlFor="title">New Todo</Label>
        <Input name="title" id="title" placeholder="What should we do today?" />
      </Form>
      <ul className="my-4">
        {loaderData.map((todo) => (
          <li
            key={todo.id}
            className={cn(
              "flex flex-row justify-between p-4",
              todo.completed ? "line-through" : ""
            )}
          >
            {todo.title}
            <div className="flex gap-4">
              <Form method="POST" action={`/todos/${todo.id}`}>
                <input
                  type="hidden"
                  name="completed"
                  value={!todo.completed ? "true" : "false"}
                />
                <Button type="submit">Complete</Button>
              </Form>
              <Form method="POST" action={`/todos/${todo.id}/delete`}>
                <Button variant="destructive" type="submit">
                  X
                </Button>
              </Form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
