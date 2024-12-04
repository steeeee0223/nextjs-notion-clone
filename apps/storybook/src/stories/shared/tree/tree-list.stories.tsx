import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CRUDItem, TreeGroup, TreeList } from "@swy/ui/shared";

import { folderNodes } from "./data";

const meta = {
  title: "shared/Tree List",
  component: TreeList,
  parameters: { layout: "centered" },
  argTypes: { Item: { control: false }, selectedId: { type: "string" } },
  tags: ["autodocs"],
} satisfies Meta<typeof TreeList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nodes: folderNodes,
    defaultIcon: { type: "lucide", name: "file-text" },
    showEmptyChild: true,
  },
};

const RenderWithGroup: Story["render"] = (props) => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  return (
    <TreeGroup
      className="w-60 bg-sidebar p-2"
      title="Workspace"
      description="Add a file"
    >
      <TreeList {...props} selectedId={activeFile} onSelect={setActiveFile} />
    </TreeGroup>
  );
};

export const WithGroup: Story = {
  args: {
    nodes: folderNodes,
    defaultIcon: { type: "lucide", name: "file-text" },
    showEmptyChild: true,
  },
  render: RenderWithGroup,
};

export const WithCustomItem: Story = {
  args: {
    nodes: folderNodes,
    defaultIcon: { type: "lucide", name: "file-text" },
    showEmptyChild: true,
    Item: ({ node, isSelected, onSelect, ...props }) => (
      <CRUDItem
        {...props}
        id={node.id}
        label={node.title}
        icon={node.icon}
        active={isSelected}
        onClick={onSelect}
      />
    ),
  },
  render: RenderWithGroup,
};
