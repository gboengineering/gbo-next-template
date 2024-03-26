import { eq } from "drizzle-orm";

import SessionTable from "./SessionTable";

import { db } from "@/database";
import { sessions, users } from "@/database/schema";
import { columns } from "./columns";

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
  const sessionData = await getSessionData();

  return (
    <>
      <SessionTable columns={columns} data={sessionData} />
    </>
  );
}
