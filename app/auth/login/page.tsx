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
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  identifier: z
    .string()
    .min(2, {
      message: "Používateľské meno musí mať aspoň 2 znaky.",
    })
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || val.length >= 2,
      {
        message: "Zadajte platný e-mail alebo používateľské meno.",
      }
    ),
  password: z.string().min(8, {
    message: "Heslo musí mať aspoň 8 znakov.",
  }),
});

const FormLogin = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const loginData = await signIn("credentials", {
        identifier: values.identifier, // email or username
        password: values.password,
        redirect: false,
      });

      console.log("log:: ", loginData);

      if (loginData?.status === 401) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.identifier)) {
          setError("Tento e-mail alebo heslo nie je správne.");
        } else {
          setError("Tento používateľské meno alebo heslo nie je správne.");
        }
      } else if (loginData?.ok) {
        router.refresh();
        router.push(".././");
        console.log("Authentication successful:", loginData);
      } else {
        setError("Vyskytla sa neočakávaná chyba. Skúste to prosím znova.");
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full"
          method="POST"
        >
          <div className="w-1/2 md:w-[20rem] space-y-2 m-auto">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prihlasovacie meno alebo e-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe alebo johndoe@example.com"
                      {...field}
                    />
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
                      placeholder="Zadajte svoje heslo"
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
              Prihlásiť sa
            </Button>
          </div>
        </form>
      </Form>

      <div className="flex justify-center mt-5">
        {error && <p className="text-red-500 font-bold mt-1">{error}</p>}
      </div>

      <div className="flex justify-center mt-5">
        <p>Nemáte účet? </p>
        <a
          href="/auth/registration"
          className="text-red-500 font-bold ml-3 underline"
        >
          Registrácia
        </a>
      </div>
    </>
  );
};

export default FormLogin;
