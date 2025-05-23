import type { Meta, StoryObj } from "@storybook/react";

import { getMemberColumns, MembersTable, Scope } from "@swy/notion";
import { mockMemberships } from "@swy/notion/mock";

const meta = {
  title: "notion/Data Tables/Members",
  component: MembersTable,
  parameters: { layout: "centered" },
  tags: ["!autodocs"],
  render: (args) => (
    <div className="w-[480px]">
      <MembersTable {...args} />
    </div>
  ),
} satisfies Meta<typeof MembersTable>;
export default meta;

type Story = StoryObj<typeof meta>;

const memberColumns = getMemberColumns("123", new Set(Object.values(Scope)));

export const Default: Story = {
  args: {
    columns: memberColumns,
    data: mockMemberships.members,
  },
};

export const Empty: Story = {
  args: {
    columns: memberColumns,
    data: [],
  },
};
