"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
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
import { useRouter } from "next/navigation";

const formSchema: z.Schema<any> = z
  .object({
    name: z.string().min(1, "Toto pole je povinné").max(100),
    email: z.string().min(1, "Toto pole je povinné").email("Neplatný e-mail"),
    password: z
      .string()
      .min(1, "Toto pole je povinné")
      .min(8, "Heslo musí mať aspoň 8 znakov"),
    confirmPassword: z.string().min(1, "Je potrebné potvrdenie hesla"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Heslá nie sú zhodné",
  });

const FormRegister = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });
    if (response.ok) {
      router.push("/auth/login");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-5 text-xl font-semibold">
        <h1>Registrácia</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          <div className="space-y-2 w-1/2 sm:w-1/5 m-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prihlasovacie meno</FormLabel>
                  <FormControl>
                    <Input placeholder="vickysmith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heslo</FormLabel>
                  <FormControl>
                      <PasswordInput
                        placeholder="Zadajte heslo"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zadajte znova svoje heslo</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Opätovné zadanie hesla"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button className="w-1/7 mt-[20px]" type="submit">
              Zaregistrovať sa
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex justify-center mt-5">
        <p>Máte účet? </p>
        <a href="/auth/login" className="text-red-500 font-bold ml-3 underline">
          Prihlásiť sa
        </a>
      </div>
      <div className="flex justify-center mt-5">
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </div>
    </>
  );
};

export default FormRegister;
