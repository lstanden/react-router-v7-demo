import { redirect } from "react-router";
import type { Route } from "./+types/todos.$id.delete";

export async function action({ request, params }: Route.ActionArgs) {
  const data = await request.formData();
  const id = params.id;

  await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  return redirect("/todos");
}
