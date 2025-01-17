"use client";

import { createContext, useContext } from "react";

export enum MenuType {
  Props = "props",
  Edit = "edit",
}

interface MenuControlInterface {
  menu: MenuType | null;
  setMenu: (type: MenuType | null) => void;
}

export const MenuControlContext = createContext<MenuControlInterface | null>(
  null,
);

export const useMenuControl = () => {
  const context = useContext(MenuControlContext);
  if (!context) {
    throw new Error("useMenuControl must be used within a MenuControlProvider");
  }
  return context;
};
