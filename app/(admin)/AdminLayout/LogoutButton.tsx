import React from "react";

import { classNames } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  active: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  close: () => void;
  children: React.ReactNode;
}

export default React.forwardRef<HTMLSpanElement, Props>(
  ({ active, children, setDialogOpen, close, ...rest }, ref) => {
    function handleLogoutClick() {
      setDialogOpen(true);
      close();
    }

    return (
      <>
        <span
          ref={ref}
          className={classNames(
            active ? "bg-gray-50" : "",
            "block px-3 py-1 text-sm leading-6 cursor-pointer text-gray-900"
          )}
          {...rest}
          onClick={handleLogoutClick}
        >
          {children}
        </span>
      </>
    );
  }
);
