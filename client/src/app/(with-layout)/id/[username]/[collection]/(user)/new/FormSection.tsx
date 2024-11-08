"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants";
import { collectionCard as CollectionCard } from "@/types/CollectionCard";
import { useRouter, useParams } from "next/navigation";

const answerSchema = z.object({
  answer: z.string().min(2, {
    message: "Answer needs to be at least 2 characters long.",
  }),
  is_correct: z.boolean(),
});

const formSchema = z.object({
  question: z.string().min(2, {
    message: "Question needs to be at least 2 characters long.",
  }),
  question_type: z.string(),
  // answers is an array of objects
  // which contain the answer and whether it is correct or not
  answers: z.array(answerSchema),
});

interface CreateCardPayload extends z.infer<typeof formSchema> {
  collection_id: string;
}

const DEFAULT_ANSWERS: z.infer<typeof answerSchema>[] = [
  {
    answer: "",
    is_correct: true,
  },
];

async function createCard(payload: CreateCardPayload): Promise<CollectionCard> {
  const url = `${API_BASE_URL}/card`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log(payload);

  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
  }

  const data = (await res.json()) as CollectionCard;
  console.log(data);
  return data;
}

export default function FormSection({
  collectionId,
}: {
  collectionId: string;
}) {
  const router = useRouter();
  const params = useParams<{ username: string; collection: string }>();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: CreateCardPayload = {
      ...values,
      collection_id: collectionId,
    };

    const data = await createCard(payload);
    if (!data) {
      console.log("error creating card");
      return;
    }
    console.log("card created");
    console.log(data);

    // TODO: add error handling display for user
    const createdRoute = `/id/${params.username}/${params.collection}/${data.id}`;
    router.push(createdRoute);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      question_type: "open_ended",
      answers: DEFAULT_ANSWERS,
    },
  });

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    name: "answers",
    control,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="My Question..." {...field} />
              </FormControl>
              <FormDescription>
                This is the question for your card
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="question_type"
          render={() => <></>}
        />

        {fields.map((field, index) => (
          <div key={field.id}>
            <FormField
              control={control}
              name={`answers.${index}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="My answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`answers.${index}.is_correct`}
              render={() => <></>}
            />
          </div>
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
