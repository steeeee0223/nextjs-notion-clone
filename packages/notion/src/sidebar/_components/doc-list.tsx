import React from "react";

import {
  IconInfo,
  TreeGroup,
  TreeItem,
  TreeList,
  useTree,
} from "@swy/ui/shared";

import type { DocItemData } from "../types";
import { ActionGroup } from "./action-group";

interface DocListProps {
  group: string;
  title: string;
  defaultIcon?: IconInfo;
  isLoading?: boolean;
  onSelect: (group: string, id: string) => void;
  onCreate: (parentId?: string) => void;
  onArchive: (id: string) => void;
}

export const DocList: React.FC<DocListProps> = ({
  group,
  title,
  defaultIcon,
  isLoading,
  onSelect,
  onCreate,
  onArchive,
}) => {
  const selectedId = useTree((state) => state.selectedId);
  const selectNode = useTree((state) => state.select);
  const getNodes = useTree((state) => state.getNodes<DocItemData>);

  const select = (id: string) => {
    selectNode(id);
    onSelect(group, id);
  };

  return (
    <TreeGroup
      title={title}
      description={`Add a ${group}`}
      isLoading={isLoading}
      onCreate={() => onCreate()}
    >
      <TreeList
        nodes={getNodes(group)}
        defaultIcon={defaultIcon}
        showEmptyChild={group === "document"}
        selectedId={selectedId}
        onSelect={select}
        Item={({ node, ...props }) => (
          <TreeItem
            {...props}
            node={node}
            className="group"
            expandable={group === "document"}
          >
            <ActionGroup
              lastEditedBy={node.lastEditedBy}
              lastEditedAt={node.lastEditedAt}
              onCreate={() => onCreate(node.id)}
              onDelete={() => onArchive(node.id)}
            />
          </TreeItem>
        )}
      />
    </TreeGroup>
  );
};
