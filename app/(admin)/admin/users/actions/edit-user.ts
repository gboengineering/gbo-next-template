"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/database";
import { users } from "@/database/schema";

interface EditUser {
  username: string;
  email: string;
}

export default async function editUser(editUser: EditUser, userId: string) {
  try {
    const editedUser = await db
      .update(users)
      .set(editUser)
      .where(eq(users.id, userId))
      .returning({ username: users.username });

    revalidatePath("/admin/users");

    return {
      success: `Success edit user ${editedUser[0].username}`,
      error: "",
    };
  } catch (e: any) {
    return {
      success: "",
      error: e.message as string,
    };
  }
}
