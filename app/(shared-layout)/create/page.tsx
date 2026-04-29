"use client"
import { blogPostSchema } from "@/app/schemas/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreatePage() {

    const form = useForm({
        resolver: zodResolver(blogPostSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    })

    function onSubmit(data: z.infer<typeof blogPostSchema>) {
            console.log(data);
    }
    return (
        <div>
            <div className="text-center py-6">
                <h1 className="text-4xl font-extrabold tracking-tight">Create Post</h1>
            <p className="text-xl text-gray-400">Turn your ideas into reality with our easy-to-use post creation tool.</p>
            </div>

            <Card className="w-full max-w-5xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            {/* Use Controller to manage the title field */}
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Title</FieldLabel>
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}