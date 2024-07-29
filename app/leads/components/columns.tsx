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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DataTableColumnHeader } from "./data-table-column-header";
import { responsibles, statuses } from "../data/data";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import supabase from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export type Customer = {
  id: string;
  status: string;
  email: string;
  name: string;
  quote: number;
  responsible: string;
  created_at: string;
  notes?: string;
};

const handleDelete = async (customerId: string, router: any, toast: any) => {
  const { error } = await supabase.from("leads").delete().eq("id", customerId);

  if (error) {
    console.error("Error deleting customer:", error);
    toast({
      title: "Uh oh! Something went wrong.",
      description:
        "There was a problem with your request. Failed to delete row.",
      variant: "destructive",
    });
  } else {
    console.log(`Customer with ID ${customerId} deleted successfully`);
    router.refresh();
    toast({
      title: "Success!",
      description: "Row deleted successfully.",
    });
  }
};

const ActionsCell = ({ customer }: { customer: Customer }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  return (
    <AlertDialog onOpenChange={(change) => setShowDropdownMenu(change)}>
      <Sheet onOpenChange={(change) => setShowDropdownMenu(change)}>
        <DropdownMenu
          open={showDropdownMenu}
          onOpenChange={(change) => setShowDropdownMenu(change)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <SheetTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                View notes
              </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Notes:</SheetTitle>
              </SheetHeader>
              <p className="p-6 whitespace-pre-wrap">{customer.notes}</p>
            </SheetContent>
            <DropdownMenuItem asChild>
              <Link href={`/leads/${customer.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="text-red-500 font-semibold"
                onSelect={(e) => e.preventDefault()}
              >
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  lead and remove their data from the servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(customer.id, router, toast)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </DropdownMenuContent>
        </DropdownMenu>
      </Sheet>
    </AlertDialog>
  );
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
        <span>{row.getValue("name")}</span>
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
        <span>{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "responsible",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Responsible" />
    ),
    cell: ({ row }) => {
      const responsible = responsibles.find(
        (responsible) => responsible.value === row.getValue("responsible")
      );

      if (!responsible) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{responsible.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formattedDate = date.toISOString().split("T")[0];
      return (
        <div className="flex space-x-2">
          <span>{formattedDate}</span>
        </div>
      );
    },
  },

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
          <span>{formatted}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell customer={row.original as Customer} />,
  },
];
