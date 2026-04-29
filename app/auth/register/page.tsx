"use client"
import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function Register() {

    // type FormData = z.infer<typeof signUpSchema>
    
    const form = useForm({

        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })

    function onSubmit() {
        console.log(form.getValues())
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Register
                </CardTitle>
                <CardDescription>
                    <span className="font-bold">Create a new account</span> to get started with our services. Fill in the form below to register and access all the features we offer.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Use Controller to manage the name field */}
                        <Controller
                            name="name"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Sirius Black" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />

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