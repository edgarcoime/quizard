import { collectionFormSchema } from "@/components/forms/collection/collectionSchema";
import { z } from "zod";

export interface CreateCollectionPayload
  extends z.infer<typeof collectionFormSchema> {
  slug: string;
}
