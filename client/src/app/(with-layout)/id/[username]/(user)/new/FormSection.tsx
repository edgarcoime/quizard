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
import { useState } from "react";
import { UserCollection } from "@/types/UserCollection";
import { useRouter, useParams } from "next/navigation";

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

async function createCollection(
  payload: CreateCollectionPayload,
): Promise<UserCollection> {
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
  }

  const data = (await res.json()) as UserCollection;
  return data;
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
  const router = useRouter();
  const params = useParams<{ username: string }>();

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

    const data = await createCollection(payload);
    if (!data) {
      console.log("error creating collection");
      return;
    }
    console.log("collection created");
    console.log(data);

    // TODO: add error handling display for user
    const createdRoute = `/id/${params.username}/${data.slug}`;
    router.push(createdRoute);
  }

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="my-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="my-4">
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
              <FormItem className="flex flex-row items-center content-center space-x-3 rounded-md border my-4 px-2 py-1 shadow">
                <FormControl>
                  <Checkbox
                    className="w-6 h-6 align-middle"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel
                  className="w-full h-8 inline-block align-middle cursor-pointer"
                  style={{
                    marginTop: "0",
                    height: "full",
                    alignContent: "center",
                  }}
                >
                  Mark the collection as public viewable
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full text-lg h-12">
          Submit
        </Button>
      </form>
    </Form>
  );
}
