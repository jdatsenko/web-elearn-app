"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";

const Password = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  function changePassword() {
    if (newPassword.length < 8) {
      setErrorMessage("Heslo musí obsahovať aspoň 8 znakov.");
      return;
    } else if (password.length < 8) {
      setErrorMessage("Vaše doterajšie heslo je nesprávne.");
      return;
    }
    if (newPassword !== repeatPassword) {
      setErrorMessage("Nové heslo a jeho potvrdenie sa nezhodujú.");
      return;
    }

    axios
      .post("/api/update", {
        oldPassword: password,
        newPassword: newPassword,
      })
      .then((response) => {
        setSuccessMessage("Heslo bolo úspešne aktualizované!");
        setTimeout(() => {
          router.push("./");
        }, 700);
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorMessage(
          "Nepodarilo sa aktualizovať heslo. Vaše doterajšie heslo je nesprávne."
        );
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
      {successMessage && (
        <p className="text-green-600 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default Password;
