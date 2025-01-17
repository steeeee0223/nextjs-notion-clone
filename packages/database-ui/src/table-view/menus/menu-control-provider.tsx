"use client";

import React, { useMemo, useState } from "react";

import { MenuControlContext, MenuType } from "./menu-control-context";

type MenuControlProviderProps = React.PropsWithChildren;

export const MenuControlProvider: React.FC<MenuControlProviderProps> = ({
  children,
}) => {
  const [menu, setMenu] = useState<MenuType | null>(null);
  const contextValue = useMemo(() => ({ menu, setMenu }), [menu]);

  return (
    <MenuControlContext.Provider value={contextValue}>
      {children}
    </MenuControlContext.Provider>
  );
};
