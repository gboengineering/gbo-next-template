import Link from "next/link";
import { headers } from "next/headers";

import { classNames } from "@/lib/utils";
import { navigation } from "./menu";

export default function AdminSidebar() {
  const pathname = headers().get("x-pathname");

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
                <Link
                  href={item.href}
                  className={classNames(
                    item.href === pathname
                      ? "bg-indigo-700 text-white"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.href === pathname
                        ? "text-white"
                        : "text-indigo-200 group-hover:text-white",
                      "h-6 w-6 shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
