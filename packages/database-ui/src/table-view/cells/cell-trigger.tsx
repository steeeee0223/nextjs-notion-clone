import React, { forwardRef } from "react";

import "../view.css";

import { cn } from "@swy/ui/lib";

interface CellTriggerProps extends React.PropsWithChildren {
  className?: string;
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
}

export const CellTrigger = forwardRef<HTMLDivElement, CellTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        className={cn(
          "transition-background-in relative block min-h-8 w-full cursor-pointer select-none overflow-clip whitespace-normal px-2 py-[5px] text-sm",
          className,
        )}
        {...props}
      />
    );
  },
);

CellTrigger.displayName = "CellTrigger";
