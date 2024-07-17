"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { differenceInDays, parseISO } from "date-fns";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { statuses } from "./data/data";

export type Customer = {
  id: string;
  status: "viable" | "in progress" | "successful" | "canceled";
  email: string;
  name: string;
  quote: number;
  responsible: "craig" | "katie" | "mark";
  created_at: string;
};

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="">{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "responsible",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Responsible" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="capitalize">{row.getValue("responsible")}</span>
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const createdAt = parseISO(row.getValue("created_at"));
      const daysDifference = differenceInDays(new Date(), createdAt);
      return (
        <div className="flex space-x-2">
          <span className="">{daysDifference} days ago</span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "quote",
  //   header: ({ column }) => {
  //     return (
  //       <div className="">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //           className=""
  //         >
  //           Quote <CaretSortIcon className="ml-1 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const quote = parseFloat(row.getValue("quote"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(quote);

  //     return <div className=" font-medium">{formatted}</div>;
  //   },
  // },

  {
    accessorKey: "quote",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quote" />
    ),
    cell: ({ row }) => {
      const quote = parseFloat(row.getValue("quote"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(quote);
      return (
        <div className="flex space-x-2">
          <span className="">{formatted}</span>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy row ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>Update details</DropdownMenuItem>
            <DropdownMenuItem>Delete lead</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
