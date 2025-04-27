"use client";
import axios from "axios";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const TeacherRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    qualification: "",
    experience: "",
  });

  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      name: "",
      surname: "",
      qualification: "",
      experience: "",
    });

    if (
      formData.name === "" ||
      formData.surname === "" ||
      formData.qualification === "" ||
      formData.experience === ""
    ) {
      setError("Vyplňte všetky polia.");
      return;
    }

    axios
      .post("/api/user/teacherRequest", formData)
      .then((response) => {
        setSuccessMessage(
          "Žiadosť bola úspešne odoslaná! Počkajte na schválenie."
        );
        setError("");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch((error: any) => {
        setError(error.response.data.message);
        setSuccessMessage("");
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <p className="text-2xl font-bold text-center my-4 flex items-center justify-center">
        Žiadosť o funkciu učiteľa
        <span className="ml-2">
          <Dialog>
            <DialogTrigger asChild>
              <Info className="w-6 h-6 text-blue-500 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <p className="text-lg text-center mt-2 font-semibold">
                Čo môže učiteľ urobiť?
              </p>
              <p>V rámci tejto platformy môže učiteľ prispievať k vzdelávaciemu procesu pridaním nových tém a testov. Okrem toho má možnosť upravovať alebo vymazávať existujúce témy, čím neustále zlepšuje obsah a zaisťuje aktuálnosť materiálov. <br /> <br /> Aby ste sa stali učiteľom na tejto platforme, je potrebné vyplniť túto žiadosť a zdieľať svoje odborné kvalifikácie a zručnosti, ktoré preukazujú vašu odbornosť a schopnosť prispievať k vzdelávaniu študentov.</p>
              <DialogFooter className="flex justify-center gap-2 mt-4">
                <DialogClose className="flex">
                  <Button className="px-4 py-2 rounded-lg" variant="secondary">
                    Zavrieť
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </span>
      </p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4 mx-7">
          <Label htmlFor="name" className="block text-sm font-medium">
            Meno
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4 mx-7">
          <Label htmlFor="surname" className="block text-sm font-medium">
            Priezvisko
          </Label>
          <Input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4 mx-7">
          <Label htmlFor="qualification" className="block text-sm font-medium">
            Kvalifikácie / Vzdelávanie
          </Label>
          <Textarea
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          ></Textarea>
        </div>
        <div className="mb-4 mx-7">
          <Label htmlFor="experience" className="block text-sm font-medium">
            Skúsenosti
          </Label>
          <Textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          ></Textarea>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleSubmit}>Odoslať</Button>
        </div>
        {error && (
          <p className="text-red-600 mt-2 font-bold text-center mb-4">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-600 mt-2 font-bold text-center mb-4">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default TeacherRequestForm;
