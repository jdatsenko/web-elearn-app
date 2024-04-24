"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AdminPanel: React.FC = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('/api/user/getTeacherRequests').then((response) => {
            setRequests(response.data);
        });
    }, []);

  return (
    <div className="max-w-md mx-auto">
    <h1 className="text-2xl font-bold text-center my-4">Teacher Requests</h1>
        {requests.map((request: any) => (
            <div key={request.id} className="border p-4 my-4">
                <h2 className="text-xl font-bold">{request.name} {request.surname}</h2>
                <p className="text-gray-600">{request.qualification}</p>
                <p className="text-gray-600">{request.experience}</p>
                <p className="text-gray-600">{request.email}</p>

            </div>
        ))}
    </div>
  );
};

export default AdminPanel;
