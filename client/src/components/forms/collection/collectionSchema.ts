import { z } from "zod";

export const collectionFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title needs to be at least 2 characters long.",
    })
    .max(30, {
      message: "Title needs to be at most 30 characters long.",
    }),
  is_public: z.boolean(),
});
