"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from "@swy/ui/shadcn";

const urlSchema = z.object({
  url: z
    .string()
    .min(1, { message: "URL should not be empty" })
    .url({ message: "Invalid URL" }),
});

interface UrlFormProps {
  disabled?: boolean;
  onUrlSubmit?: (url: string) => void;
}

export const UrlForm = ({ onUrlSubmit, disabled }: UrlFormProps) => {
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "" },
  });

  const onSubmit = (values: z.infer<typeof urlSchema>) => {
    onUrlSubmit?.(values.url);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-x-2"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="h-7 flex-1">
              <FormControl>
                <Input
                  clear
                  disabled={disabled}
                  type="url"
                  placeholder="Paste an image link..."
                  {...field}
                  onCancel={() => form.setValue("url", "")}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="blue"
          size="sm"
          className="h-7"
          disabled={disabled}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
