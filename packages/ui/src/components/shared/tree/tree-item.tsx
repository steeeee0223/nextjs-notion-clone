"use client";

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@swy/ui/lib";
import { Button, buttonVariants } from "@swy/ui/shadcn";

import { IconBlock } from "../icon-block";
import type { TreeItemData } from "./types";

export interface TreeItemProps<T extends TreeItemData>
  extends React.PropsWithChildren {
  node: T;
  level?: number;
  className?: string;
  expandable?: boolean;
  expanded?: boolean;
  isSelected?: boolean;
  onExpand?: () => void;
  onSelect?: () => void;
}

export function TreeItem<T extends TreeItemData>({
  node,
  level = 0,
  className,
  expandable,
  expanded,
  isSelected,
  children,
  onExpand,
  onSelect,
}: TreeItemProps<T>) {
  return (
    <div
      role="button"
      id={node.id}
      tabIndex={0}
      aria-label={node.title}
      onClick={onSelect}
      onKeyDown={onSelect}
      style={{ paddingLeft: `${(level + 1) * 12}px` }}
      className={cn(
        buttonVariants({ variant: "subitem" }),
        "h-[27px] w-full justify-normal py-1 pr-3 font-medium",
        isSelected && "bg-primary/10 text-primary dark:text-primary/80",
        className,
      )}
    >
      <div className="group/icon">
        <Button
          variant="hint"
          size="icon-sm"
          className={cn(
            "relative hidden shrink-0 p-0.5",
            expandable && "group-hover/icon:flex",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onExpand?.();
          }}
          aria-label={expanded ? "collapse" : "expand"}
        >
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </Button>
        <IconBlock
          className={cn(expandable && "group-hover/icon:hidden")}
          icon={node.icon ?? { type: "text", text: node.title }}
        />
      </div>
      <span className="ml-1 truncate">{node.title}</span>
      {children}
    </div>
  );
}
