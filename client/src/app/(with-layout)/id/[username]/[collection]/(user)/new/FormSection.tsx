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
    is_correct: false,
  },
];

async function createCard(payload: CreateCardPayload) {
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
    return { error: res.statusText };
  }

  const data = await res.json();
  console.log(data);
}

export default function FormSection({
  collectionId,
}: {
  collectionId: string;
}) {
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: CreateCardPayload = {
      ...values,
      collection_id: collectionId,
    };

    createCard(payload);
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
