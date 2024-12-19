import { redirect } from "react-router";
import type { Route } from "./+types/todos.$id";

export async function action({ request, params }: Route.ActionArgs) {
  const data = await request.formData();
  const id = params.id;

  await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: data.get("completed") === "true",
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  return redirect("/todos");
}
