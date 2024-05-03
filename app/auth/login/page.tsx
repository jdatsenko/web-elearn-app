"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const FormLogin = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const loginData = await signIn("credentials", {
        name: values.name,
        password: values.password,
        redirect: false,
      });
      console.log("log", loginData);

      if (loginData?.status === 401) {
        setError("Nesprávne používateľské meno alebo heslo. Skúste to prosím znova.");
      } else {
        router.refresh();
        router.push(".././");
        console.log("Authentication successful:", loginData);
      }
    } catch (error: unknown) {
      console.error("Vyskytla sa neočakávaná chyba:", error);
      setError("Vyskytla sa neočakávaná chyba. Skúste to prosím neskôr.");
    }
  };

  return (
    <>
      <div className="flex justify-center my-5 text-xl font-semibold">
        <h1>Prihlásenie</h1>
      </div>

      {error && (
        <div className="text-red-500 font-bold text-center mb-4">
          {error}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full "
          method="POST"
        >
          <div className="space-y-2 w-1/2 sm:w-1/5 m-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prihlasovacie meno</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
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
                    <Input
                      type="password"
                      placeholder="Enter your password"
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
              Login
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex justify-center mt-5">
        <p>Nemáte účet?{" "}</p>
        <a href="/auth/registration" className="text-red-500 font-bold ml-3 underline">
          Registrácia
        </a>
      </div>
    </>
  );
};

export default FormLogin;
