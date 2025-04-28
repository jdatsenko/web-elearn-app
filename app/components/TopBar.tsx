"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useState, useEffect, use } from "react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserCircleIcon } from "lucide-react";

const TopBar = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const isTeacher = session?.user?.role === "TEACHER";
  const isAdmin = session?.user?.role === "ADMIN";
  const TopBarSkeleton = dynamic(() => import("./skeletons/TopBarSkeleton"), {
    ssr: false,
  });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
    return <TopBarSkeleton />;
  }

  return (
    <>
      <header
        className={cn(
          "p-4 flex bg-background flex-col sm:flex-row w-full justify-between border-b h-fit sticky top-0 z-10"
        )}
      >
        <div className="flex flex-grow justify-between items-center">
          <div className="flex gap-1 md:gap-3 items-center">
            <Link href={"/."} className="hover:scale-105 transition duration-500 ease-in-out">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={50}
                className={isDark ? "h-15 w-40 md:h-10 md:w-[9rem]" : "brightness-0 h-15 w-40 md:h-10 md:w-[9rem]"}
              />
            </Link>
            {!loading && (
              <div className="space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="border px-4 py-[0.48rem] mr-1 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                    <UserCircleIcon className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-2 border-gray-200">
                    <DropdownMenuItem className="justify-center">
                      <Link href={"/videos"}>Zaujímavé videá</Link>
                    </DropdownMenuItem>
                    {session && (
                      <>
                        <DropdownMenuSeparator className="bg-gray-300"></DropdownMenuSeparator>
                        <DropdownMenuItem className="justify-center">
                          <Link className="text-center" href={"/account/progress"}>
                            Moj progress
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-300"></DropdownMenuSeparator>
                        <DropdownMenuItem className="justify-center">
                          <Link href={"/account/data"}>Spravovať údaje</Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-gray-300"></DropdownMenuSeparator>
                        {!isAdmin && !isTeacher && (
                          <DropdownMenuItem className="justify-center">
                            <Link
                              className="text-center"
                              href={"/teacherRequestForm"}
                            >
                              Stať sa učiteľom
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {isAdmin && (
                          <DropdownMenuItem>
                            <Link className="text-center" href={"/adminPanel"}>
                              Panel administrátora
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {isTeacher && (
                          <DropdownMenuItem className="justify-center">
                            <Link className="text-center" href={"/teacher"}>
                              Pridať tému
                            </Link>
                          </DropdownMenuItem>
                        )}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          <div className="flex gap-1 md:gap-3 items-center">
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
