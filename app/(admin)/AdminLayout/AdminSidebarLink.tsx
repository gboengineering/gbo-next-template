"use client";

import React, { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { classNames } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
}

interface SidebarIconProps {
  href: string;
  icon: ReactElement;
}

export function AdminSidebarLink({ href, children }: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={classNames(
        href === pathname
          ? "bg-indigo-700 text-white"
          : "text-indigo-200 hover:text-white hover:bg-indigo-700",
        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
      )}
    >
      {children}
    </Link>
  );
}

export function AdminSidebarIcon({ href, icon }: SidebarIconProps) {
  const pathname = usePathname();
  const ItemIcon = icon;

  return (
    <icon.type
      className={classNames(
        href === pathname
          ? "text-white"
          : "text-indigo-200 group-hover:text-white",
        "h-6 w-6 shrink-0"
      )}
      aria-hidden="true"
      {...icon.props}
    />
  );
}
