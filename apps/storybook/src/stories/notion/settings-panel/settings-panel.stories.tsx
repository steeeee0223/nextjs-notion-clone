import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { SettingsPanel2, useSettingsStore2 } from "@swy/notion";
import {
  mockConnections,
  mockSettings,
  mockUploadFile,
} from "@swy/notion/mock";
import { ModalProvider } from "@swy/ui/shared";

import { ModalTrigger } from "./settings";

const meta = {
  title: "notion/Settings Panel",
  component: SettingsPanel2,
  parameters: { layout: "centered" },
  tags: ["!autodocs"],
  args: {
    updateSettings: fn(),
    uploadFile: mockUploadFile,
    people: {},
    connections: {
      load: () => Promise.resolve(mockConnections),
    },
  },
} satisfies Meta<typeof SettingsPanel2>;
export default meta;

type Story = StoryObj<typeof meta>;

const RenderWithZustand: Story["render"] = (props) => {
  const { settings, update } = useSettingsStore2();

  useEffect(() => {
    update(props.settings);
  }, [props.settings, update]);

  return (
    <div className="flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-solid p-0 shadow">
      <SettingsPanel2 {...props} settings={settings} updateSettings={update} />
    </div>
  );
};

export const Default: Story = {
  args: {
    settings: mockSettings,
  },
  render: RenderWithZustand,
};

export const Modal: Story = {
  args: { settings: mockSettings },
  render: ({ settings }) => (
    <ModalProvider>
      <ModalTrigger initialData={settings} />
    </ModalProvider>
  ),
};
