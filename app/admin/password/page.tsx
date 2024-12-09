"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Password = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function changePassword() {
    if (newPassword.length < 8) {
      setErrorMessage("Heslo musí obsahovať aspoň 8 znakov.");
      return;
    } else if (password.length < 8) {
      setErrorMessage("Vaše doterajšie heslo je nesprávne.");
      return;
    }
    axios
      .post("/api/update", {
        oldPassword: password,
        newPassword: newPassword,
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Heslo bolo úspešne aktualizované!");
        router.push("./");
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorMessage(
          "Nepodarilo sa aktualizovať heslo. Vaše doterajšie heslo je nesprávne."
        );
      });
  }

  return (
    <div className="flex flex-col mt-10 items-center">
      <Input
        className="w-64 mb-4"
        type="password"
        placeholder="Staré heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        className="w-64 mb-4"
        type="password"
        placeholder="Nové heslo"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button onClick={() => changePassword()} className="w-32">
        Zmeniť heslo
      </Button>
      {successMessage && (
        <p className="text-green-600 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default Password;
