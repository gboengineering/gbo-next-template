"use server";

// import { headers } from "next/headers";
import { cookies } from "next/headers";

import { lucia } from "@/lib/auth";

export default async function logout() {
  //   const headersList = headers();
  const cookieStore = cookies();

  const sessionCookie = lucia.createBlankSessionCookie();
  //   headersList.set("Set-Cookie", sessionCookie.serialize());
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
