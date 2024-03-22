import { headers } from "next/headers";
import AdminLayout from "./AdminLayout";

export default function AdminTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = headers().get("x-pathname");

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
