import React from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import LogoutButton from "./LogoutButton";
import LogoutDialog from "./LogoutDialog";
import { classNames } from "@/lib/utils";
import type { User } from "lucia";

const userNavigation = [{ name: "Your profile", href: "/admin/profile" }];

export default function HeaderMenuDropdown({ user }: { user: User }) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      {isDialogOpen && <LogoutDialog setDialogOpen={setDialogOpen} />}
      <Menu as="div" className="relative">
        <Menu.Button className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span className="hidden lg:flex lg:items-center">
            <span
              className="ml-4 text-sm font-semibold leading-6 text-gray-900"
              aria-hidden="true"
            >
              {user.username}
            </span>
            <ChevronDown
              className="ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            static
          >
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              {({ active, close }) => (
                <LogoutButton
                  active={active}
                  setDialogOpen={setDialogOpen}
                  close={close}
                >
                  Logout
                </LogoutButton>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
