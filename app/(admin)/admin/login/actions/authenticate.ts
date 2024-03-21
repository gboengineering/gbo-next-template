"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";

import { loginSchema } from "../LoginForm";
import { db } from "@/database";
import { users } from "@/database/schema";
import { lucia } from "@/lib/auth";

export default async function authenticate(input: z.infer<typeof loginSchema>) {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, input.username));

    if (existingUser.length === 0) {
      return {
        error: "Username or password is wrong",
      };
    }

    const user = existingUser[0];
    const validPassword = await new Argon2id().verify(
      user.password as string,
      input.password
    );

    if (!validPassword) {
      return {
        error: "Username or password is wrong",
      };
    }

    const session = await lucia.createSession(user.id, {
      username: user.username,
      role: user.role,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    console.log("session: ", session);
    console.log("session cookie: ", sessionCookie);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      error: "",
    };
  } catch (e: any) {
    return {
      error: e.message as string,
    };
  }
}
