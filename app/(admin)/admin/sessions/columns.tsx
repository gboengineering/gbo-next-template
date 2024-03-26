"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import DeleteSessionDialog from "./DeleteSessionDialog";

import { getSessionData } from "./page";
import { ParseDate } from "@/lib/date";

import type { ValuesType } from "utility-types";
import type { ColumnDef } from "@tanstack/react-table";

type Session = ValuesType<Awaited<ReturnType<typeof getSessionData>>>;

const date = new Date();

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "sessionId",
    header: "Session ID",
  },
  {
    id: "username",
    accessorFn: (row) => row.users?.username,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) =>
      new ParseDate(row.sessionExpiration, "Asia/Jakarta").toLocaleString({
        withDateTime: true,
      }),
    header: "Expired At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DeleteSessionDialog id={row.original.sessionId}>
          <Button variant="destructive">Delete Session</Button>
        </DeleteSessionDialog>
      );
    },
  },
];
