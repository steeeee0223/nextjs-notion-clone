/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import { Badge, DropdownMenuGroup, DropdownMenuItem } from "@swy/ui/shadcn";
import { IconBlock } from "@swy/ui/shared";
import { Role } from "@swy/validators";

import { Icon } from "../../common";
import type { Workspace } from "../../workspace-provider";
import { planTitle } from "../constant";

interface TitleProps {
  workspace: Workspace;
  onClick: (workspaceId: string) => void;
}

const Title: React.FC<TitleProps> = ({ workspace, onClick }) => {
  switch (workspace.role) {
    case Role.GUEST:
      return (
        <div className="mx-2 min-w-0">
          <div className="truncate text-sm">
            <div className="flex">
              <span className="flex-shrink overflow-hidden text-ellipsis">
                {workspace.name}
              </span>
              <Badge
                variant="orange"
                size="sm"
                className="ml-2 select-none self-center whitespace-nowrap uppercase"
              >
                <Icon.Globe className="mr-0.5 size-2 fill-orange" />
                Guest
              </Badge>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="mx-2 min-w-0">
          <div
            className="truncate text-sm"
            onClick={() => onClick(workspace.id)}
          >
            {workspace.name}
          </div>
          <div className="truncate text-xs text-secondary dark:text-secondary-dark">
            {planTitle[workspace.plan]} · {workspace.members} members
          </div>
        </div>
      );
  }
};

interface WorkspaceListProps {
  activeWorkspace: Workspace;
  workspaces: Workspace[];
  onSelect?: (id: string) => void;
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({
  activeWorkspace,
  workspaces: initialWorkspaces,
  onSelect,
}) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const [workspaces, setWorkspaces] = useState(initialWorkspaces);

  const handleSort = () => {
    const _workspaces = [...workspaces];
    const [dragItemContent] = _workspaces.splice(dragItem.current!, 1);

    _workspaces.splice(dragOverItem.current!, 0, dragItemContent!);

    dragItem.current = null;
    dragOverItem.current = null;

    setWorkspaces(_workspaces);
  };

  useEffect(() => {
    if (workspaces.length !== initialWorkspaces.length)
      setWorkspaces(initialWorkspaces);
  }, [workspaces, initialWorkspaces]);

  return (
    <DropdownMenuGroup className="select-none">
      {workspaces.map((workspace, i) => (
        <DropdownMenuItem
          key={i}
          className="h-11 px-0 py-1"
          draggable
          onDragStart={() => (dragItem.current = i)}
          onDragEnter={() => (dragOverItem.current = i)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => onSelect?.(workspace.id)}
        >
          <div className="visible mx-1 flex h-6 w-[18px] cursor-grab items-center justify-center">
            <Icon.DragHandle className="fill-primary/45" />
          </div>
          <div draggable={false} className="flex items-center">
            <IconBlock size="md" icon={workspace.icon} />
          </div>
          <Title
            workspace={workspace}
            onClick={() => onSelect?.(workspace.id)}
          />
          {activeWorkspace.id === workspace.id && (
            <div className="ml-auto mr-1">
              <Check className="mr-2 size-4 select-none self-center" />
            </div>
          )}
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  );
};
