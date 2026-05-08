"use client";
import { createBlogAction } from "@/app/action";
import { blogPostSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexAuth, useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function CreatePage() {
  const mutation = useMutation(api.posts.createPost);
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            toast.error("You must be logged in to create a post");
            router.push("/auth/login");
        }
    }, [isAuthenticated, isLoading]);

  const form = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { formState } = form;
  const isPending = formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof blogPostSchema>) {
    try {
    //   await mutation({
    //     title: data.title,
    //     content: data.content,
        //   });
    await createBlogAction(data);

      toast.success("Post created successfully!");
      form.reset();
    //   router.push("/blogs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post");
    }
  }
  return (
    <div>
      <div className="text-center py-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Create Post</h1>
        <p className="text-xl text-gray-400">
          Turn your ideas into reality with our easy-to-use post creation tool.
        </p>
      </div>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Create Blog Post
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to create a new blog post.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              {/* Use Controller to manage the title field */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      aria-invalid={!!fieldState.error}
                      placeholder="Write a title.."
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              {/* Use Controller to manage the content field */}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={!!fieldState.error}
                      placeholder="Write your content..."
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />{" "}
                    <span>Creating...</span>
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
