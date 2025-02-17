"use client";
import axios from "axios";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

    if(formData.name === "" || formData.surname === "" || formData.qualification === "" || formData.experience === "") {
      setError("Vyplňte všetky polia.")
      return;
    }

    axios
      .post("/api/user/teacherRequest", formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Žiadosť bola úspešne odoslaná! Počkajte na schválenie.");
        setError(""); 
        setTimeout(() => {
          router.push("../account");
        }, 1000);
      })
      .catch((error: any) => {
        setError(error.response.data.message)
        setSuccessMessage("");
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">
        Žiadosť o funkciu učiteľa
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4 mx-7">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
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
          <Label
            htmlFor="surname"
            className="block text-sm font-medium text-gray-700"
          >
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
          <Label
            htmlFor="qualification"
            className="block text-sm font-medium text-gray-700"
          >
            Kvalifikácie
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
          <Label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700"
          >
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
          <Button
            onClick={handleSubmit}
          >
            Odoslať
          </Button>
        </div>
        {error && (
          <p className="text-red-600 font-bold text-center mb-4">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-600 font-bold text-center mb-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default TeacherRequestForm;
