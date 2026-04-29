"use client"
import { blogPostSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Create Blog Post</CardTitle>
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
                                        <Input aria-invalid={!!fieldState.error} placeholder="Write a title.." {...field} />
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
                                        <Textarea aria-invalid={!!fieldState.error} placeholder="Write your content..." {...field} />
                                        {fieldState.invalid && (<FieldError>{fieldState.error?.message}</FieldError>)}
                                    </Field>
                                )} />
                            
                            <Button type="submit">Create Post</Button>
                        </FieldGroup>

                        
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}