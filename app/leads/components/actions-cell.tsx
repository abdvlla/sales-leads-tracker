"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import supabase from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Link from "next/link";

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
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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

export default ActionsCell;
