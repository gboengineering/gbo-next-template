import { redirect } from "next/navigation";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

import { validateRequest } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/admin/login");
  }

  return (
    <div>
      <AdminSidebar />
      <AdminHeader user={user}>{children}</AdminHeader>
    </div>
  );
}
