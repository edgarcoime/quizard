import { z } from "zod";

export const schema = z.object({
  title: z.string().trim().min(1, { message: "Title is required." }),
  body: z.string().trim().min(1, { message: "Body is required." }),
  userId: z.number().int("UserId is required"),
});
