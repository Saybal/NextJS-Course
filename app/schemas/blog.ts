import { title } from "process";
import z from "zod";

export const blogPostSchema = z.object({
    title: z.string().min(5).max(100),
    content: z.string().min(20)
})