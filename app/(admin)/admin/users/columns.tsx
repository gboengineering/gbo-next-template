"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteDialog from "./DeleteDialog";
import BanDialog from "./BanDialog";
import EditDialog from "./EditDIalog";

import type { User } from "@/database/schema";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const asd = row.original;
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <EditDialog user={row.original}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit User
              </DropdownMenuItem>
            </EditDialog>
            <DeleteDialog id={row.original.id}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete User
              </DropdownMenuItem>
            </DeleteDialog>
            <BanDialog id={row.original.id}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Ban User
              </DropdownMenuItem>
            </BanDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
