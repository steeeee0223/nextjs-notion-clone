import type { Meta, StoryObj } from "@storybook/react";
import { HelpCircle } from "lucide-react";

import { Hint, HintProvider } from "@swy/ui/shared";

const meta = {
  title: "shared/Hint",
  component: Hint,
  parameters: { layout: "centered" },
  argTypes: { children: { control: false } },
  tags: ["autodocs"],
  render: (props) => (
    <HintProvider>
      <Hint {...props} />
    </HintProvider>
  ),
} satisfies Meta<typeof Hint>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "Shows some messages",
    children: <HelpCircle className="h-4 w-4" />,
  },
};
