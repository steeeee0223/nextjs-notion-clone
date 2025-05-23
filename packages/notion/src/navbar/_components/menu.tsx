"use client";

import { MoreHorizontal, Trash } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@swy/ui/shadcn";
import { Hint } from "@swy/ui/shared";

import { toDateString } from "../../common";
import type { PageContextInterface } from "../../page-provider";
import type { Page } from "../../types";

interface MenuProps {
  page: Page;
  onChangeState?: PageContextInterface["onChangeState"];
}

export const Menu = ({ page, onChangeState }: MenuProps) => {
  return (
    <DropdownMenu>
      <Hint description="Style, export, and more...">
        <DropdownMenuTrigger asChild>
          <Button variant="nav" size="icon-md">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="warning"
            onClick={() => onChangeState?.(page.id, "archive")}
          >
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-center p-2 text-xs text-muted dark:text-muted-dark">
          <div className="w-full">Last edited by: {page.lastEditedBy}</div>
          <div className="w-full">{toDateString(page.lastEditedAt)}</div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="size-10" />;
};
