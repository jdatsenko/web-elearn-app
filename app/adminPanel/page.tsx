"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const AdminPanel: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    axios.get("/api/user/getTeacherRequests").then((response) => {
      setRequests(response.data);
    });
  }, []);

  const updateRequestStatus = async (
    id: string,
    status: "approved" | "declined"
  ) => {
    try {
      await axios.post(
        `/api/user/${
          status === "approved"
            ? "approveTeacherRequest"
            : "declineTeacherRequest"
        }`,
        { id }
      );
      axios.get("/api/user/getTeacherRequests").then((response) => {
        setRequests(response.data);
      });
    } catch (error) {
      console.error(
        `Chyba pri ${
          status === "approved" ? "schválení" : "zamietnutí"
        } žiadosti:`,
        error
      );
    }
  };

  if (!isAdmin) {
    return (
      <p className="font-bold text-center text-red-600 mt-4">
        Nie ste autorizovaný ako administrátor
      </p>
    );
  }

  return (
    <div className="w-2/3 mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">
        Žiadosti o učiteľské konto
      </h1>
      <div className="overflow-x-auto mb-10">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">Meno</th>
              <th className="px-4 py-2">Priezvisko</th>
              <th className="px-4 py-2">Kvalifikácia</th>
              <th className="px-4 py-2">Skúsenosti</th>
              <th className="px-4 py-2">E-mail</th>
              <th className="px-4 py-2">Stav</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request: any) => (
              <tr key={request.id}>
                <td className="px-4 text-center py-2">{request.name}</td>
                <td className="px-4 text-center py-2">{request.surname}</td>
                <td className="px-4 text-center py-2">
                  {request.qualification}
                </td>
                <td className="px-4 text-center py-2">{request.experience}</td>
                <td className="px-4 text-center py-2">{request.email}</td>
                {request.status === "pending" && (
                  <td className="px-4 text-center py-2">
                    <Button
                      className="mb-4 mr-2"
                      onClick={() =>
                        updateRequestStatus(request.id, "approved")
                      }
                    >
                      Schváliť
                    </Button>
                    <Button
                      onClick={() =>
                        updateRequestStatus(request.id, "declined")
                      }
                    >
                      Zamietnuť
                    </Button>
                  </td>
                )}
                {request.status !== "pending" && (
                  <td className="px-4 text-center py-2">
                    Žiadosť{" "}
                    {request.status === "approved" ? "schválená" : "zamietnutá"}
                  </td>
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
