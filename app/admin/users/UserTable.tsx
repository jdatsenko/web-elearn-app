import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Table as ReactTable } from "@tanstack/react-table";

interface UserTableProps {
  table: ReactTable<any>;
  columnsLength: number;
  count: number;
}

const centeredColumns = [
  "id",
  "createdAt",
  "_count.createdTopics",
  "_count.solvedTests",
];

const UserTable: React.FC<UserTableProps> = ({
  table,
  columnsLength,
  count,
}) => {
  return (
    <Table className="mb-8">
      <TableCaption>Zoznam používateľov v systéme.</TableCaption>

      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="select-none">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const className = centeredColumns.includes(cell.column.id)
                  ? "text-center"
                  : "";
                return (
                  <TableCell key={cell.id} className={className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columnsLength} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell className="font-bold" colSpan={columnsLength}>
            Spolu: {count} používateľov
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default UserTable;
