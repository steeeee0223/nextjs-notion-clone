import React, { forwardRef } from "react";

import { cn } from "@swy/ui/lib";
import {
  Button,
  groupVariants,
  menuItemVariants,
  PopoverClose,
  type MenuItemVariants,
} from "@swy/ui/shadcn";

import * as Icon from "../icons";

interface MenuHeaderProps {
  title: string;
  onBack?: () => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex h-[42px] shrink-0 items-center px-4 pb-1.5 pt-3.5">
      <Button
        variant="hint"
        className="-ml-0.5 mr-2 h-[22px] w-6 shrink-0 animate-bg-in rounded-md p-0"
        onClick={onBack}
      >
        <Icon.ArrowLeftThick className="block size-4 shrink-0 fill-primary/45" />
      </Button>
      <span className="grow truncate text-sm font-semibold" aria-label={title}>
        {title}
      </span>
      <PopoverClose asChild>
        <Button variant="close" size="circle">
          <Icon.Close className="block h-full w-3.5 shrink-0 fill-secondary dark:fill-primary/45" />
        </Button>
      </PopoverClose>
    </div>
  );
};

export const MenuGroup: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div role="group" className={cn(groupVariants())}>
    {children}
  </div>
);

interface MenuGroupHeaderProps {
  title: string;
  action?: string | null;
  onActionClick?: () => void;
}

export const MenuGroupHeader: React.FC<MenuGroupHeaderProps> = ({
  title,
  action,
  onActionClick,
}) => {
  return (
    <div className="mb-2 mt-1.5 flex h-[19px] select-none fill-primary/45 px-3.5 text-xs/[1.2] font-medium text-secondary dark:text-secondary-dark">
      <div className="flex self-center">{title}</div>
      {action && (
        <div className="ml-auto">
          <Button
            tabIndex={0}
            variant="soft-blue"
            className="h-[initial] min-w-0 shrink bg-transparent px-1.5 py-0.5 text-xs/[1.2] shadow-none"
            onClick={onActionClick}
          >
            {action}
          </Button>
        </div>
      )}
    </div>
  );
};

type MenuItemProps = React.HTMLAttributes<HTMLDivElement> &
  MenuItemVariants & {
    disabled?: boolean;
  };

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, variant, disabled, className, ...props }, ref) => (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      className={cn(menuItemVariants({ variant, disabled, className }))}
      {...props}
      data-disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </div>
  ),
);

MenuItem.displayName = "MenuItem";
