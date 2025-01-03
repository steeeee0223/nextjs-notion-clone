"use client";

import React from "react";

import { useOrigin } from "@swy/ui/hooks";
import { TreeGroup, TreeItem, TreeList } from "@swy/ui/shared";

import { generateDefaultIcon } from "../../common";
import { usePlatformStore } from "../../slices";
import { selectTreeGroup } from "../../slices/selectors";
import type { UpdatePageParams } from "../../types";
import { ActionGroup } from "./action-group";
import { MenuType } from "./types";

interface DocListProps {
  group: string;
  title: string;
  isLoading?: boolean;
  redirect?: (url: string) => void;
  onCreate?: (group: string, parentId?: string) => void;
  onDuplicate?: (id: string) => void;
  onUpdate?: (id: string, data: UpdatePageParams) => void;
}

export const DocList: React.FC<DocListProps> = ({
  group,
  title,
  isLoading,
  redirect,
  onCreate,
  onDuplicate,
  onUpdate,
}) => {
  const origin = useOrigin();
  const defaultIcon = generateDefaultIcon(group);

  const nodes = usePlatformStore((state) => selectTreeGroup(state, group));
  const activePage = usePlatformStore((state) => state.activePage);
  const setActivePage = usePlatformStore((state) => state.setActivePage);

  const select = (id: string, url?: string) => {
    setActivePage(id);
    redirect?.(url ?? "#");
  };

  return (
    <TreeGroup
      title={title}
      description={`Add a ${group}`}
      isLoading={isLoading}
      onCreate={() => onCreate?.(group)}
    >
      <TreeList
        nodes={nodes}
        defaultIcon={defaultIcon}
        showEmptyChild={group === "document"}
        selectedId={activePage}
        Item={({ node, ...props }) => (
          <TreeItem
            {...props}
            node={node}
            onSelect={() => select(node.id, node.url)}
            className="group"
            expandable={group === "document"}
          >
            <ActionGroup
              type={MenuType.Normal}
              title={node.title}
              icon={node.icon ?? defaultIcon}
              pageLink={node.url ? `${origin}/${node.url}` : "#"}
              isFavorite={node.isFavorite}
              lastEditedBy={node.lastEditedBy}
              lastEditedAt={node.lastEditedAt}
              onCreate={() => onCreate?.(group, node.id)}
              onDuplicate={() => onDuplicate?.(node.id)}
              onUpdate={(data) => onUpdate?.(node.id, data)}
            />
          </TreeItem>
        )}
      />
    </TreeGroup>
  );
};
