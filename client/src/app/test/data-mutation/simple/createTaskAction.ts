"use server";

import { revalidatePath } from "next/cache";

export interface FormState {
  message: string;
}

// Client FCs should not be async
export async function createTaskAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const content = formData.get("content");

  // Parse formdata here and form payload
  const payload = {
    title: "test1",
    body: "body1",
    userId: 1,
  };

  // Query backend/database here to create resource
  // await new Promise((r) => setTimeout(r, 2000));
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Check if data is okay
  if (!res.ok) {
    // Here you would construct a return so that client can display to user
    console.log("Something went wrong with creating resource");
    return { message: "Something went wrong in the server" };
  }

  // Server response to resource
  // Check if something went wrong
  const data = await res.json();
  console.log(data);

  // After done tell nextjs to revalidate the page
  revalidatePath("/test/data-mutation/simple");

  return { message: `Task created "${content}"` };
}
