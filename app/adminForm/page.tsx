"use client"
import axios from 'axios';
import React, { useState } from 'react';

const TeacherRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    qualification: '',
    experience: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      name: '',
      surname: '',
      qualification: '',
      experience: '',
    });
    axios.post('/api/user/teacherRequest', formData);
  };

  return (
    <div className="max-w-md mx-auto">
    <h1 className="text-2xl font-bold text-center my-4">Teacher Request Form</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Surname</label>
        <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualifications</label>
        <textarea id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
        <textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
      </div>
      <div className="flex justify-center">
         <button type="submit" className="bg-red-500 text-white px-4 py-2 mb-8 rounded-md hover:bg-red-600">Submit</button>
      </div>
    </form>
    </div>
  );
};

export default TeacherRequestForm;
