"use client";
import axios from "axios";
import React, { useState } from "react";

const TeacherRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    qualification: "",
    experience: "",
  });

  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

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
    axios
      .post("/api/user/teacherRequest", formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Request sent successfully! Wait for approval.");
        setError(""); // Clear any previous error messages
      })
      .catch((error: any) => {
        setError(error.response.data.message)
        setSuccessMessage("");
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">
        Teacher Request Form
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4 mx-7">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Meno
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4 mx-7">
          <label
            htmlFor="surname"
            className="block text-sm font-medium text-gray-700"
          >
            Priezvisko
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4 mx-7">
          <label
            htmlFor="qualification"
            className="block text-sm font-medium text-gray-700"
          >
            Kvalifikácie
          </label>
          <textarea
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          ></textarea>
        </div>
        <div className="mb-4 mx-7">
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700"
          >
            Skúsenosti
          </label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 mb-8 rounded-md hover:bg-red-600"
          >
            Odoslať
          </button>
        </div>
        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default TeacherRequestForm;
