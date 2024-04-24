"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useState, useEffect, use } from "react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  if (loading) {
    return <div className="text-center mt-4 text-lg">Loading...</div>;
  }

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <>
      <header className="p-4 flex flex-col sm:flex-row w-full justify-between border-b">
        <div className="flex flex-grow justify-between">
          <div className="flex gap-3 self-start">
            <Link
              className={cn(buttonVariants({ variant: "secondary" }))}
              href={"/."}
            >
              Domov
            </Link>
            {session && !loading && (
              <div className="space-x-3">
                <Link className={buttonVariants()} href={"/admin"}>
                  Moje konto
                </Link>
                {!isAdmin && (
                <Link className={buttonVariants()} href={"/adminForm"}>
                  Teacher
                </Link>
                )}
                {isAdmin && (
                <Link className={buttonVariants()} href={"/adminPanel"}>
                  Admin Panel
                </Link>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-3 self-end">
            {!session && !loading ? (
              <>
                <Link
                  href="/auth/login/"
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Prihlásenie
                </Link>
                <Link
                  href="/auth/registration/"
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Registrácia
                </Link>
              </>
            ) : (
              <>
                {!loading && (
                  <Button onClick={handleSignOut}>Odhlásiť sa</Button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center ml-4 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>
    </>
  );
};

export default TopBar;
