"use client";
// This is client side because it is a component rendered on it
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
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
import { schema } from "./createTestPostSchema";
import { onSubmitAction } from "./createTestPostAction";
import { useRef } from "react";

export default function CreateTestPostForm() {
  const [state, formAction] = useFormState(onSubmitAction, { message: "" });
  const form = useForm<z.output<typeof schema>>({
    // Create schema/shape of form fields
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      body: "",
      userId: 1,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      {/*If there is a message print*/}
      {state?.message !== "" && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}

      {/* If there are a list of things wrong with the form display */}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="">
                Issue: {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form
        ref={formRef}
        action={formAction}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit((clientValidatedData) => {
            formAction(objectToFormData(clientValidatedData));
          })(e);
        }}
        className="space-y-8"
      >
        {/* Post Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My post..." {...field} />
              </FormControl>
              <FormDescription>This is the title of your post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Post Body */}
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Input placeholder="blahblahblah..." {...field} />
              </FormControl>
              <FormDescription>What are you writing about?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User id should be dynamic at the end */}
        <Input type="hidden" value={1} />
        <FormField
          control={form.control}
          name="userId"
          render={() => <Input type="hidden" />}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
