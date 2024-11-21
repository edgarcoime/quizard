"use client";

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
import { collectionFormSchema as formSchema } from "./collectionSchema";
import { UserCollection } from "@/types/UserCollection";
import toKebabCase from "@/lib/functions/toKebabCase";
import { createCollection, updateCollection } from "./collectionMutations";
import { CreateCollectionPayload } from "@/types/CreateCollectionPayload";
import { useRouter, useParams } from "next/navigation";
import { UpdateCollectionPayload } from "@/types/UpdateCollectionPayload";

interface props {
  type: "create" | "update";
  defaultState?: UserCollection | null;
}

export default function CollectionFormSection({ type, defaultState }: props) {
  const router = useRouter();
  const params = useParams<{ username: string; collection: string }>();
  // additional hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: type === "update" ? defaultState?.title : "",
      is_public: type === "update" ? defaultState?.is_public : true,
    },
  });

  async function createSubmit(formData: z.infer<typeof formSchema>) {
    const slug = toKebabCase(formData.title) ?? "default-slug";

    const payload: CreateCollectionPayload = {
      title: formData.title,
      is_public: formData.is_public,
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

  async function updateSubmit(formData: z.infer<typeof formSchema>) {
    const originalSlug = params.collection;
    const slug = defaultState!.slug ?? toKebabCase(formData.title);

    const payload: UpdateCollectionPayload = {
      title: formData.title,
      is_public: formData.is_public,
      slug,
    };

    const data = await updateCollection(originalSlug, payload);
    if (!data) {
      console.log("error updating collection");
      return;
    }

    console.log("collection updated");
    //const updatedRoute = `/id/${params.username}/${data.slug}`;
    //router.push(updatedRoute);
  }

  const formSubmitHandler = type === "update" ? updateSubmit : createSubmit;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmitHandler)}>
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
                  {type === "update"
                    ? `NOTE: Changing title will not change your original collection slug.(${defaultState?.slug})`
                    : "This is the title of your collection."}
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
          Update
        </Button>
      </form>
    </Form>
  );
}
