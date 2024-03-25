"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/database";
import { users } from "@/database/schema";

export default async function banUser(id: string) {
  try {
    const deletedUser = await db
      .update(users)
      .set({ active: false, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning({ username: users.username });

    revalidatePath("/admin/users");

    return {
      success: `Success update user ${deletedUser[0].username}`,
      error: "",
    };
  } catch (e: any) {
    return {
      success: "",
      error: e.message as string,
    };
  }
}
