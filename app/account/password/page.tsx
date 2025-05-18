"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/hooks/use-toast"

const Password = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const { toast } = useToast()

  function changePassword() {
    if (newPassword.length < 8) {
      toast({
        title: "Nepodarilo sa aktualizovať heslo.",
        description: "Heslo musí obsahovať aspoň 8 znakov.",
        variant: "destructive",
      });
      return;
    } else if (password.length < 8) {
        toast({
          title: "Nepodarilo sa aktualizovať heslo.",
          description: "Vaše doterajšie heslo je nesprávne.",
          variant: "destructive",
        });
      return;
    }
    if (newPassword !== repeatPassword) {
      toast({
        title: "Nepodarilo sa aktualizovať heslo.",
        description: "Nové heslo a jeho potvrdenie sa nezhodujú.",
        variant: "destructive",
      });
      return;
    }

    axios
      .post("/api/updatePassword", {
        oldPassword: password,
        newPassword: newPassword,
      })
      .then(() => {
        toast({
          title: "Heslo bolo úspešne aktualizované!",
          description: "Zmeny sú uložené.",
          variant: "default",
        });
        setTimeout(() => {
          router.push("./");
        }, 700);
      })
      .catch(() => {
        toast({
          title: "Nepodarilo sa aktualizovať heslo.",
          description: "Vaše doterajšie heslo je nesprávne.",
          variant: "destructive",
        });
      });
  }

  return (
    <div className="flex flex-col mt-10 items-center space-y-4">
      <h1 className="text-2xl font-bold text-center my-4">Nastavte staré a nové heslo</h1>
      <PasswordInput
        className="w-64"
        placeholder="Staré heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <PasswordInput
        className="w-64"
        placeholder="Nové heslo"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <PasswordInput
        className="w-64"
        placeholder="Zadajte znova nové heslo"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />

      <div className="flex space-x-2">
        <Button onClick={() => router.push("/account/data")} variant="secondary">
          Späť
        </Button>
        <Button onClick={() => changePassword()} className="w-32">
          Zmeniť heslo
        </Button>
      </div>
    </div>
  );
};

export default Password;
