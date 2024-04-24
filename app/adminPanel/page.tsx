"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const AdminPanel: React.FC = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('/api/user/getTeacherRequests').then((response) => {
            setRequests(response.data);
        });
    }, []);

  return (
    <div className="w-2/3 mx-auto">
    <h1 className="text-2xl font-bold text-center my-4">Teacher Requests</h1>
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Surname</th>
            <th className="px-4 py-2">Qualifications</th>
            <th className="px-4 py-2">Experience</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request: any) => (
            <tr key={request.id}>
              <td className="px-4 text-center py-2">{request.name}</td>
              <td className="px-4 text-center py-2">{request.surname}</td>
              <td className="px-4 text-center py-2">{request.qualification}</td>
              <td className="px-4 text-center py-2">{request.experience}</td>
              <td className="px-4 text-center py-2">{request.email}</td>
              {request.status === 'pending' && (
                <td className="px-4 text-center py-2">
                <Button className="mr-2" onClick={() => {
                  axios.post('/api/user/approveTeacherRequest', { id: request.id })
                }}>Approve</Button>
                <Button onClick={() => {
                  axios.post('/api/user/declineTeacherRequest', { id: request.id })
                }}>Decline</Button>
              </td>
                )}
              {request.status !== 'pending' && (
                <td className="px-4 text-center py-2">Request {request.status}</td> 
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default AdminPanel;
