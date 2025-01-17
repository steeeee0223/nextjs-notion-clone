import React from "react";

import { cn } from "@swy/ui/lib";
import {
  groupVariants,
  menuItemVariants,
  type MenuItemVariants,
} from "@swy/ui/shadcn";

export const MenuGroup: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div role="group" className={cn(groupVariants())}>
    {children}
  </div>
);

type MenuItemProps = React.HTMLAttributes<HTMLDivElement> & MenuItemVariants;

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  variant,
  className,
  ...props
}) => (
  <div
    role="button"
    tabIndex={0}
    className={cn(menuItemVariants({ variant, className }))}
    {...props}
  >
    {children}
  </div>
);
