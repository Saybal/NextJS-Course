"use client"
import { LoginSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function LoginPage() {

    const form = useForm({
    
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                email: "",
                password: ""
            }
    })

    async function onSubmit(data: z.infer<typeof LoginSchema>) {
            await authClient.signIn.email({
                email: data.email,
                password: data.password
            })
        }
    
    return (
        <Card>
                    <CardHeader>
                        <CardTitle>
                            Login
                        </CardTitle>
                        <CardDescription>
                            <span className="font-bold">Sign in</span> to your account to access all the features we offer.
                        </CardDescription>
                    </CardHeader>
        
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
        
                                {/* Use Controller to manage the email field */}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field>
                                            <FieldLabel>Email</FieldLabel>
                                            <Input aria-invalid={fieldState.invalid} placeholder="sirius.black@example.com" {...field} />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />
        
                                {/* Use Controller to manage the password field */}
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field>
                                            <FieldLabel>Password</FieldLabel>
                                            <Input aria-invalid={fieldState.invalid} type="password" placeholder="••••••••" {...field} />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />
        
                                <Button type="submit">Register</Button>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
    )
}