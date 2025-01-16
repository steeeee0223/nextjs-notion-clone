import React from "react";
import { MoreHorizontal, Plus, Trash } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@swy/ui/shadcn";
import { Hint } from "@swy/ui/shared";

import { toDateString } from "../../common";

interface ActionGroupProps {
  lastEditedBy: string;
  lastEditedAt: number;
  onCreate: () => void;
  onDelete: () => void;
}

export const ActionGroup: React.FC<ActionGroupProps> = ({
  lastEditedBy,
  lastEditedAt,
  onCreate,
  onDelete,
}) => {
  return (
    <div className="ml-auto flex items-center p-0.5">
      <DropdownMenu>
        <Hint description="Delete, duplicate, and more...">
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
            <Button
              variant="hint"
              className="ml-auto size-auto p-0.5 opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </Hint>
        <DropdownMenuContent
          className="w-60"
          align="start"
          side="right"
          forceMount
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem variant="warning" onClick={onDelete}>
              <Trash className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <div className="flex flex-col items-center p-2 text-xs text-muted dark:text-muted-dark">
            <div className="w-full">Last edited by: {lastEditedBy}</div>
            <div className="w-full">{toDateString(lastEditedAt)}</div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Hint description="Add a page inside">
        <Button
          variant="hint"
          className="ml-auto size-auto rounded-sm p-0.5 opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onCreate();
          }}
        >
          <Plus className="size-4" />
        </Button>
      </Hint>
    </div>
  );
};
