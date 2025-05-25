"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ManageUserDialog from "./ManageUserDialog";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

export const useUserTableColumns = (
  fetchData: () => void
): ColumnDef<TeacherUser>[] => {
  const router = useRouter();
  const { data: session } = useSession();

  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Id <ArrowUpDown size={16} />
        </Button>
      ),
      cell: (info) => info.getValue(),
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Meno <ArrowUpDown size={16} />
        </Button>
      ),
      cell: (info) => info.getValue(),
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Email <ArrowUpDown size={16} />
        </Button>
      ),
      cell: (info) => info.getValue(),
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Vytvorený <ArrowUpDown size={16} />
        </Button>
      ),
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString("sk-SK"),
      sortingFn: (rowA, rowB, columnId) => {
        const a = new Date(rowA.getValue(columnId));
        const b = new Date(rowB.getValue(columnId));
        return a.getTime() - b.getTime();
      },
    },
    {
      accessorKey: "role",
      header: "Rola",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "_count.createdTopics",
      header: "Vytvorené témy",
      id: "_count.createdTopics",
      cell: (info) => {
        const row = info.row.original;
        return row.role === "USER" ? "-" : info.getValue();
      },
    },
    {
      accessorKey: "_count.solvedTests",
      id: "_count.solvedTests",
      header: "Vyriešené testy",
      cell: (info) => info.getValue() ?? "-",
    },
    {
      header: "Spravovať",
      id: "actions",
      meta: { align: "center" },
      cell: ({ row }) => {
        const currentUserId = session?.user?.id;
        const rowUserId = row.original.id;

        if (currentUserId === Number(rowUserId)) {
          return (
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push("/account/data")}
            >
              Spravovať
            </Button>
          );
        }

        return (
          <ManageUserDialog
            userId={rowUserId}
            currentRole={row.original.role}
            onSuccess={fetchData}
          />
        );
      },
    },
  ];
};

export default useUserTableColumns;