"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ProfilePage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [keepCurrentName, setKeepCurrentName] = useState(true);
  const [keepCurrentEmail, setKeepCurrentEmail] = useState(true);
  const router = useRouter();
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session?.user) return;

        const res = await axios.get("/api/user/getUserData");
        setUser(res.data.user);
      } catch (error) {
        console.error("Chyba pri načítaní údajov používateľa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const handleUpdate = async () => {
    if (!keepCurrentEmail && !emailRegex.test(newEmail)) {
      toast({
        title: "Neplatný e-mail",
        description: "Zadajte platný e-mail.",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axios.put("/api/user/updateUserData", {
        name: keepCurrentName ? user?.name : newName,
        email: keepCurrentEmail ? user?.email : newEmail,
      });

      if (res.status === 200) {
        toast({
          title: "Údaje boli úspešne aktualizované.",
          description: "Zmeny sú uložené.",
          variant: "default",
        });
        setUser({
          name: keepCurrentName ? user!.name : newName,
          email: keepCurrentEmail ? user!.email : newEmail,
        });
        setEditing(false);
      }
    } catch (error) {
      console.error("Chyba pri aktualizácii údajov:", error);
      toast({
        title: "Chyba pri aktualizácii údajov",
        description: "používateľ s týmto e‑mailom alebo menom už existuje.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete("/api/user/delete");
      if (res.status === 200) {
        await signOut({
          redirect: true,
          callbackUrl: "/",
        });
      }
    } catch (error) {
      console.error("Chyba pri vymazaní účtu:", error);
    }
  };

  if (loading) return <p className="text-center">Načítava sa...</p>;
  if (!session) return <p>Musíte byť prihlásený na zobrazenie profilu.</p>;

  return (
    <div>
      <div className="mt-3 mx-4">
        <Button
          onClick={() => router.push("/account/password")}
          className="mr-3"
        >
          Zmeniť heslo
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="px-4 py-2 rounded-lg">
              Vymazať konto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] shadow-lg rounded-xl p-6">
            <DialogTitle className="text-center text-2xl font-bold">
              Vymazanie konta
            </DialogTitle>
            <p className="text-lg text-center mt-2 font-semibold">
              Ste si istí, že chcete vymazať svoje konto?
            </p>
            <p className="text-center mt-2">
              Váš študijný progres bude{" "}
              <span className="text-red-500 font-bold">navždy stratený.</span>
            </p>
            <DialogFooter className="flex justify-center gap-2 mt-4">
              <Button
                variant="destructive"
                className="px-4 py-2 rounded-lg"
                onClick={handleDeleteAccount}
              >
                Áno, vymazať
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-center p-6">
        <div className="rounded-2xl shadow-lg mx-3 md:w-1/3 lg:w-1/4 p-6">
          <p className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            Vaše údaje
          </p>

          {user ? (
            !editing ? (
              <div className="text-gray-800 dark:text-gray-300 space-y-3">
                <p className="border-b border-gray-100 dark:border-gray-800 pb-2">
                  <strong>Meno:</strong> {user.name}
                </p>
                <p className="border-b border-gray-100 dark:border-gray-800 pb-2">
                  <strong>Email:</strong> {user.email}
                </p>
                <div className="flex w-full justify-center">
                  <Button className="mt-3" onClick={() => setEditing(true)}>
                    Upraviť profil
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Label className="block text-gray-700 dark:text-gray-300">
                  <span className="text-sm font-medium">Nové meno</span>
                  <Input
                    type="text"
                    placeholder={user.name}
                    value={keepCurrentName ? user.name : newName}
                    disabled={keepCurrentName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white"
                  />
                  <Label className="flex items-center mt-2 text-gray-700 dark:text-gray-400">
                    <Checkbox
                      id="currentName"
                      checked={keepCurrentName}
                      onCheckedChange={() =>
                        setKeepCurrentName(!keepCurrentName)
                      }
                      className="mr-2"
                    />
                    Použiť aktuálne meno
                  </Label>
                </Label>

                <Label className="block text-gray-700 dark:text-gray-300">
                  <span className="text-sm font-medium">Nový email</span>
                  <Input
                    type="email"
                    placeholder={user.email}
                    value={keepCurrentEmail ? user.email : newEmail}
                    disabled={keepCurrentEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white"
                  />
                  <Label className="flex items-center mt-2 text-gray-700 dark:text-gray-400">
                    <Checkbox
                      id="currentEmail"
                      checked={keepCurrentEmail}
                      onCheckedChange={() =>
                        setKeepCurrentEmail(!keepCurrentEmail)
                      }
                      className="mr-2"
                    />
                    Použiť aktuálny email
                  </Label>
                </Label>

                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() => {
                      handleUpdate();
                    }}
                    className="w-full"
                  >
                    Uložiť zmeny
                  </Button>
                  <Button
                    className="w-full ml-3"
                    variant="secondary"
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    Zrušiť
                  </Button>
                </div>
              </div>
            )
          ) : (
            <p className="mt-6 text-center text-gray-700 dark:text-gray-400">
              Údaje sa nenašli.
            </p>
          )}
          
        </div>
      </div>
      <style>
        {`
          @media (min-width: 640px) {
            .sm\\:justify-end {
              justify-content: center !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProfilePage;
