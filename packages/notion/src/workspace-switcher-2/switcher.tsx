import React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@swy/ui/lib";
import {
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@swy/ui/shadcn";
import { IconBlock } from "@swy/ui/shared";
import type { User } from "@swy/validators";

import type { Workspace } from "../workspace-provider";
import { HeaderDropdown, WorkspaceList } from "./_components";

interface WorkspaceSwitcherProps {
  user: User;
  activeWorkspace: Workspace;
  workspaces: Workspace[];
  onCreateAccount?: () => void;
  onCreateWorkspace?: () => void;
  onLogout?: () => void;
  onSelect?: (id: string) => void;
}

export const WorkspaceSwitcher2: React.FC<WorkspaceSwitcherProps> = ({
  user,
  activeWorkspace,
  workspaces,
  onCreateAccount,
  onCreateWorkspace,
  onLogout,
  onSelect,
}) => {
  const handleGetMac = () =>
    window.open("https://www.notion.so/desktop", "_blank");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className={cn(
            buttonVariants({
              variant: "hint",
              className: "w-full justify-normal rounded-sm p-3",
            }),
          )}
        >
          <div className="flex max-w-[150px] items-center gap-x-2">
            <IconBlock size="sm" icon={activeWorkspace.icon} />
            <span className="overflow-hidden text-ellipsis text-start font-medium text-primary dark:text-primary/80">
              {activeWorkspace.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 size-4 text-primary/45" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="mx-3 mt-2 flex h-5 items-center justify-between">
          <div className="mr-1.5 truncate text-xs font-medium text-secondary dark:text-secondary-dark">
            {user.email}
          </div>
          <HeaderDropdown
            onLogout={onLogout}
            onCreateWorkspace={onCreateWorkspace}
          />
        </div>
        <WorkspaceList
          workspaces={workspaces}
          activeWorkspace={activeWorkspace}
          onSelect={onSelect}
        />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="secondary"
            className="text-xs"
            onClick={onCreateAccount}
          >
            Add another account
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="secondary"
            className="text-xs"
            onClick={onLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="secondary"
            className="text-xs"
            onClick={handleGetMac}
          >
            Get Mac App
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
