import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Overview",
};

export default async function AdminOverview() {
  const { user } = await validateRequest();
  if (user?.role !== "admin") {
    return redirect("/admin/login");
  }

  return <>asdasdasd</>;
}
