import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import SessionTable from "./SessionTable";
import { validateRequest } from "@/lib/auth";
import { db } from "@/database";
import { sessions, users } from "@/database/schema";
import { columns } from "./columns";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Sessions",
};

export async function getSessionData() {
  const sessionData = await db
    .select({
      sessionId: sessions.id,
      sessionExpiration: sessions.expiresAt,
      users: {
        userId: users.id,
        username: users.username,
      },
    })
    .from(sessions)
    .leftJoin(users, eq(sessions.userId, users.id));
  return sessionData;
}

export default async function SessionPage() {
  const { user } = await validateRequest();
  if (user?.role !== "admin") {
    return redirect("/admin/login");
  }

  const sessionData = await getSessionData();

  return (
    <>
      <SessionTable columns={columns} data={sessionData} />
    </>
  );
}
