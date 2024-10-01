"use server";

import { CreateTestPostParams } from "@/lib/api/testPost";
import { schema } from "./createTestPostSchema";

// Almost the same as CreateTestPostParams
// but can use anything here if you need more validation from frontend
export type FormState = {
  message: string;
  fields?: Record<string, string | number>;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  console.log("onSubmitAction: inside - ", parsed.data);

  // Validate input using zod
  if (!parsed.success) {
    // Return a list of fields that are wrong
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  if (parsed.data.title.includes("@")) {
    return {
      message: "Post title cannot contain character '@'.",
      fields: parsed.data,
    };
  }

  // Call api route here and validate

  return { message: "Post succesfully created" };
}
