import { MoreHorizontal, PlusSquare, XCircle } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@swy/ui/shadcn";

interface HeaderDropdownProps {
  onLogout?: () => void;
  onCreateWorkspace?: () => void;
}

export const HeaderDropdown = ({
  onCreateWorkspace,
  onLogout,
}: HeaderDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="subitem" size="icon-sm">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onCreateWorkspace}>
            <PlusSquare className="mr-2 size-4 text-icon dark:text-icon-dark" />
            Join or create workspace
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>
            <XCircle className="mr-2 size-4 text-icon dark:text-icon-dark" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
