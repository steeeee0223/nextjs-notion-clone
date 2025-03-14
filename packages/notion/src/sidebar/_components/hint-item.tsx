import { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@swy/ui/lib";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@swy/ui/shadcn";

interface HintItemProps {
  className?: string;
  icon: LucideIcon;
  label: string;
  hint: string;
  shortcut?: string;
  onClick?: () => void;
}

export const HintItem = forwardRef<HTMLButtonElement, HintItemProps>(
  ({ className, icon: Icon, label, hint, shortcut, onClick }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant="subitem"
            onClick={onClick}
            className={cn(
              "h-[27px] w-full justify-normal px-3 py-1 font-medium",
              className,
            )}
          >
            <Icon className="size-5 flex-shrink-0 rounded-sm p-0.5 text-muted dark:text-muted-dark" />
            <span className="ml-1 truncate">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          <div>{hint}</div>
          <span className="text-[#cecdca]/60 dark:text-[#7f7f7f]">
            {shortcut}
          </span>
        </TooltipContent>
      </Tooltip>
    );
  },
);

HintItem.displayName = "HintItem";
