"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUserTableColumns } from "./userTableColumns";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import RoleFilter from "./RoleFilter";
import UserTable from "./UserTable";

type TeacherUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: string;
  _count: {
    createdTopics: number;
    solvedTests?: number;
  };
};

const UserManagment: React.FC = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [users, setUsers] = useState<TeacherUser[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = React.useState<string>("all");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const fetchData = async () => {
    if (!isAdmin) return;

    setLoading(true);
    setError(null);

    try {
      const roleQuery =
        roleFilter && roleFilter !== "all" ? `?role=${roleFilter}` : "";
      const url = `/api/admin/getUsers${roleQuery}`;

      const res = await fetch(url);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error fetching users");
      }

      const data = await res.json();
      setUsers(data.users);
      setCount(data.count);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAdmin, roleFilter]);

  const columns = useUserTableColumns(fetchData);

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!isAdmin) {
    return (
      <p className="font-bold text-center text-red-600 mt-4">
        Nie ste autorizovaný ako administrátor
      </p>
    );
  }

  if (loading) {
    return <p className="text-center mt-4">Načítavam údaje...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-4">{error}</p>;
  }

  return (
    <div className="mx-10 my-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Správa používateľov
      </h1>
      <div className="mb-4 w-fit flex justify-end">
        <RoleFilter roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
        <Link
          href="/admin/panel"
          className="flex text-sm items-center w-full border px-2 rounded-sm underline ml-2 bg-background text-background-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          Späť
        </Link>
      </div>
      <div className="overflow-x-auto flex justify-center mx-auto">
        <UserTable
          table={table}
          columnsLength={columns.length}
          count={count}
        />
      </div>
    </div>
  );
};

export default UserManagment;
