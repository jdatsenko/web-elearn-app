"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
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
  DropdownMenuTrigger
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
          "p-4 flex flex-col sm:flex-row w-full justify-between border-b h-fit sticky top-0 z-10",
          theme === "dark" ? "bg-black" : "bg-white"
        )}
      >
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
                <DropdownMenu>
                  <DropdownMenuTrigger className="border px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                    <UserCircleIcon className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link className={`w-full ${buttonVariants()}`} href={"/account"}>
                        Moj progress
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem>
                      <Link
                        className={`w-full ${buttonVariants()}`}
                        href={"/account/password"}
                      >
                        Zmeniť heslo
                      </Link>
                    </DropdownMenuItem>
                    
                    {!isAdmin && !isTeacher && (
                      <DropdownMenuItem>
                        <Link
                          className={`w-full ${buttonVariants()}`}
                          href={"/adminForm"}
                        >
                          Stať sa učiteľom
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isAdmin && (
                      <DropdownMenuItem>
                        <Link
                          className={`w-full ${buttonVariants()}`}
                          href={"/adminPanel"}
                        >
                          Panel administrátora
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isTeacher && (
                      <DropdownMenuItem>
                        <Link
                          className={`w-full ${buttonVariants()}`}
                          href={"./teacher"}
                        >
                          Pridať tému
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
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
