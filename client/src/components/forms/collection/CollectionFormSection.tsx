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

interface props {
  type: "create" | "update";
  defaultState?: UserCollection | null;
}

export default function CollectionFormSection({ type, defaultState }: props) {
  // receive default values

  // interpolate data based on default

  // additional hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: type === "update" ? defaultState?.title : "",
      is_public: type === "update" ? defaultState?.is_public : false,
    },
  });

  function formSubmit(formData: z.infer<typeof formSchema>) {
    console.log("formData:", formData);
    console.log("defaultData:", defaultState);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)}>
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
