"use client";

import { SortDirection } from "@tanstack/react-table";
import { CircleArrowUp, MoreHorizontalIcon } from "lucide-react";

import { useTransition } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@swy/ui/shadcn";
import { Select, type SelectProps } from "@swy/ui/shared";

import { Icon } from "../../common";
import { Scope, type PartialRole } from "../../types";
import { roleOptions } from "./constants";
import type { GuestRow, MemberRow } from "./types";

interface HeaderProps {
  title: string;
  className?: string;
}

/**
 * Extended version
 * @see my-connections
 */
export const Header = ({ title, className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "truncate text-xs font-normal text-secondary dark:text-secondary-dark",
        className,
      )}
    >
      {title}
    </div>
  );
};

interface SortingToggleProps {
  title: string;
  isSorted: false | SortDirection;
  toggle: () => void;
}

export const SortingToggle = ({
  title,
  isSorted,
  toggle,
}: SortingToggleProps) => (
  <Button variant="hint" size="xs" onClick={toggle} className="px-1">
    <Header title={title} className="text-sm" />
    {isSorted &&
      (isSorted === "asc" ? (
        <Icon.ArrowUp className="ml-1 size-3 flex-shrink-0 fill-primary/65" />
      ) : (
        <Icon.ArrowDown className="ml-1 size-3 flex-shrink-0 fill-primary/65" />
      ))}
  </Button>
);

interface UserCellProps {
  user: MemberRow["user"];
}
export const UserCell = ({ user }: UserCellProps) => {
  return (
    <div className="z-20 flex h-full min-h-[42px] w-[220px] items-center justify-between pr-3">
      <div className="flex w-full items-center gap-2.5">
        <div className="relative flex-shrink-0">
          <img
            src={user.avatarUrl}
            alt={user.name[0]}
            className="size-7 rounded-full border border-border"
          />
        </div>
        <div className="max-w-[164px]">
          <div className="truncate text-sm text-primary dark:text-primary/80">
            {user.name}
          </div>
          <div className="truncate text-xs text-secondary dark:text-secondary-dark">
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TeamspacesCellProps {
  teamspaces: MemberRow["teamspaces"];
}
export const TeamspacesCell = ({ teamspaces }: TeamspacesCellProps) => {
  const { options, current } = teamspaces;
  const $options = options.reduce<SelectProps["options"]>(
    (acc, { id, name, members }) => ({
      ...acc,
      [id]: {
        label: name,
        description: `${members} members`,
      },
    }),
    {},
  );
  return (
    <div className="flex items-center">
      {options.length < 1 ? (
        <div className="w-auto cursor-default p-2 text-sm text-muted dark:text-muted-dark">
          No access
        </div>
      ) : (
        <Select
          className="m-0 w-auto"
          options={$options}
          value={current ?? undefined}
          hideCheck
          align="center"
          customDisplay={Custom}
        />
      )}
    </div>
  );
};

interface RoleCellProps {
  role: PartialRole;
  scopes: Set<Scope>;
  onSelect?: (role: PartialRole) => void | Promise<void>;
}
export const RoleCell = ({ role, scopes, onSelect }: RoleCellProps) => {
  const [select, isUpdating] = useTransition((role: PartialRole) =>
    onSelect?.(role),
  );

  return (
    <div className="flex items-center">
      {scopes.has(Scope.MemberUpdate) ? (
        <Select
          className="m-0 w-auto"
          options={roleOptions}
          onChange={select}
          value={role}
          align="center"
          customDisplay={Custom}
          disabled={isUpdating}
        />
      ) : (
        <div className="w-auto cursor-default text-sm text-secondary dark:text-secondary-dark">
          {roleOptions[role].label}
        </div>
      )}
    </div>
  );
};

const Custom: SelectProps["customDisplay"] = ({ option }) => (
  <div className="min-w-0 truncate text-secondary dark:text-secondary-dark">
    {typeof option === "string" ? option : option?.label}
  </div>
);

interface MemberActionCellProps {
  isSelf: boolean;
  onDelete?: () => void | Promise<void>;
}

export const MemberActionCell = ({
  isSelf,
  onDelete,
}: MemberActionCellProps) => {
  const [remove, isRemoving] = useTransition(() => onDelete?.());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="hint" size="icon-sm" disabled={isRemoving}>
          <MoreHorizontalIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem variant="warning" onClick={remove}>
          <Icon.Bye className="mr-2 size-4 flex-shrink-0 fill-red" />
          {isSelf ? "Leave workspace" : "Remove from workspace"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface AccessCellProps {
  access: GuestRow["access"];
}
export const AccessCell = ({ access }: AccessCellProps) => {
  const options = access.reduce<SelectProps["options"]>(
    (acc, { id, name, scope }) => ({
      ...acc,
      [id]: { label: name, description: scope },
    }),
    {},
  );
  return (
    <div className="flex items-center">
      {access.length < 1 ? (
        <div className="w-auto cursor-default p-2 text-sm text-muted dark:text-muted-dark">
          No access
        </div>
      ) : (
        <Select
          className="m-0 w-auto"
          options={options}
          hideCheck
          align="center"
          placeholder={`${access.length} pages`}
          customDisplay={() => AccessCellDisplay({ pages: access.length })}
        />
      )}
    </div>
  );
};

const AccessCellDisplay = ({ pages }: { pages: number }) => (
  <div className="min-w-0 truncate text-secondary dark:text-secondary-dark">{`${pages} pages`}</div>
);

interface GuestActionCellProps {
  onUpdate?: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
}

export const GuestActionCell = ({
  onUpdate,
  onDelete,
}: GuestActionCellProps) => {
  const [upgrade, isUpgrading] = useTransition(() => onUpdate?.());
  const [remove, isRemoving] = useTransition(() => onDelete?.());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="hint"
          size="icon-sm"
          disabled={isUpgrading || isRemoving}
        >
          <MoreHorizontalIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <CircleArrowUp className="mr-2 size-4" onClick={upgrade} />
          Upgrade to member
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="warning" onClick={remove}>
          <Icon.Bye className="mr-2 size-4 flex-shrink-0 fill-red" />
          Remove from workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
