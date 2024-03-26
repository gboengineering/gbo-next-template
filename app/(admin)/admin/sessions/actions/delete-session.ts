"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/database";
import { sessions } from "@/database/schema";

export default async function deleteSession(id: string) {
  try {
    const deleteSession = await db
      .delete(sessions)
      .where(eq(sessions.id, id))
      .returning();

    revalidatePath("/admin/sessions");

    return {
      success: `Success delete session ${deleteSession[0].id}`,
      error: "",
    };
  } catch (e: any) {
    return {
      success: "",
      error: e.message as string,
    };
  }
}
