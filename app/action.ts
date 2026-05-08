"use server";

import z from "zod";
import { blogPostSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";

export async function createBlogAction(data: z.infer<typeof blogPostSchema>) {
    const parsed = blogPostSchema.safeParse(data);

    if (!parsed.success) {
        throw new Error("Invalid data");
    }

    await fetchMutation(api.posts.createPost, {
        title: parsed.data.title,
        content: parsed.data.content
    });

    redirect("/blogs");
}