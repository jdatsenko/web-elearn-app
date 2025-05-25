"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";

const AdminPanel: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("/api/admin/getTeacherRequests");
    setRequests(res.data);
  };

  const updateRequestStatus = async (
    id: string,
    status: "approved" | "declined"
  ) => {
    try {
      await axios.post(
        `/api/admin/${
          status === "approved"
            ? "approveTeacherRequest"
            : "declineTeacherRequest"
        }`,
        { id }
      );
      const res = await axios.get("/api/admin/getTeacherRequests");
      fetchRequests();
    } catch (error) {
      console.error(`Chyba pri ${status} žiadosti:`, error);
    }
  };

  const handleDeleteRequest = async () => {
    if (!deleteTargetId) return;

    try {
      await axios.delete("/api/admin/deleteTeacherRequest", {
        data: { id: deleteTargetId },
      });
      setDeleteTargetId(null);
      fetchRequests();
    } catch (error) {
      console.error("Chyba pri mazání žiadosti:", error);
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
    <>
      <Link
        href="/admin/users"
        className="text-blue-600 hover:underline border-2 m-2 border-blue-500 rounded-sm p-2 inline-block"
      >
        Správa používateľov
      </Link>
      <div className="w-11/12 md:w-2/3 mx-auto my-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Žiadosti o učiteľské konto
        </h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meno</TableHead>
              <TableHead>Priezvisko</TableHead>
              <TableHead>Kvalifikácia</TableHead>
              <TableHead>Skúsenosti</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-center">Stav</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request: any) => (
              <TableRow key={request.id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.surname}</TableCell>
                <TableCell>{request.qualification}</TableCell>
                <TableCell>{request.experience}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell className="text-center">
                  {request.status === "pending" ? (
                    <div className="flex flex-col gap-2 items-center">
                      <Button
                        className="w-full"
                        variant="default"
                        onClick={() =>
                          updateRequestStatus(request.id, "approved")
                        }
                      >
                        Schváliť
                      </Button>
                      <Button
                        className="w-full"
                        variant="destructive"
                        onClick={() =>
                          updateRequestStatus(request.id, "declined")
                        }
                      >
                        Zamietnuť
                      </Button>
                    </div>
                  ) : (
                    <span>
                      Žiadosť{" "}
                      {request.status === "approved"
                        ? "schválená"
                        : "zamietnutá"}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-500"
                        onClick={() => setDeleteTargetId(request.id)}
                      >
                        Vymazať
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vymazať žiadosť</DialogTitle>
                        <DialogDescription>
                          Naozaj si prajete vymazať túto žiadosť? Táto akcia je
                          nezvratná.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose className="flex">
                          <Button
                            variant="ghost"
                            onClick={() => setDeleteTargetId(null)}
                          >
                            Zrušiť
                          </Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteRequest}
                        >
                          Vymazať
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdminPanel;
