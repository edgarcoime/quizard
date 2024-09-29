"use client";

import { useFormState } from "react-dom";
import { createTaskAction, FormState } from "./createTaskAction";

const initialState: FormState = {
  message: "",
};

// Client FCs should not be async
export default function TodoForm() {
  const [state, formAction] = useFormState(createTaskAction, initialState);

  return (
    <div>
      <form action={formAction}>
        <input type="text" placeholder="type here" name="content" required />
        <button type="submit">Create Task</button>

        <p aria-live="polite">{state?.message}</p>
      </form>
    </div>
  );
}
