"use client";

import toKebabCase from "@/lib/functions/toKebabCase";
import useUserData from "@/components/hooks/useUserData";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { API_BASE_URL } from "@/constants";

const formSchema = z.object({
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

interface CreateCollectionPayload extends z.infer<typeof formSchema> {
  slug: string;
}

async function createCollection(payload: CreateCollectionPayload) {
  const url = `${API_BASE_URL}/collection`;
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

function ErrorView() {
  return <div>Error loading user data.</div>;
}

function LoadingView() {
  return (
    <div className="h-72 flex flex-col justify-center bg-gray-200">
      <h2 className="uppercase text-center text-2xl">loading</h2>
    </div>
  );
}

export default function FormSection() {
  const { data, isLoading, isError } = useUserData();

  // additional hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      is_public: true,
    },
  });

  // logic
  // TODO: find more elegant way to wait for results and display errors
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = toKebabCase(values.title) ?? "default-slug";

    const payload: CreateCollectionPayload = {
      title: values.title,
      is_public: values.is_public,
      slug,
    };
    console.log(payload);

    createCollection(payload);
  }

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My Collection..." {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your collection.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_public"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Mark the collection as public viewable</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
