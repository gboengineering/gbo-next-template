import { AdminSidebarLink, AdminSidebarIcon } from "./AdminSidebarLink";

import { navigation } from "./menu";

export default function AdminSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
          />
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <AdminSidebarLink href={item.href}>
                  <AdminSidebarIcon href={item.href} icon={<item.icon />} />
                  {item.name}
                </AdminSidebarLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
