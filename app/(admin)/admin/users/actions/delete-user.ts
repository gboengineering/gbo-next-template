"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/database";
import { users } from "@/database/schema";

export default async function deleteUser(id: string) {
  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    revalidatePath("/admin/users");

    return {
      success: `Success delete user ${deletedUser[0].username}`,
      error: "",
    };
  } catch (e: any) {
    return {
      success: "",
      error: e.message as string,
    };
  }
}
