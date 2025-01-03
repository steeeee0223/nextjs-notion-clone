"use client";

import { useEffect } from "react";
import { SettingsIcon } from "lucide-react";

import {
  SettingsPanel2,
  useSettingsStore2,
  type SettingsStore,
} from "@swy/notion";
import { mockConnections, mockUploadFile } from "@swy/notion/mock";
import { Button, Dialog, DialogContent } from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

export const ModalTrigger = (props: { initialData: SettingsStore }) => {
  const { setOpen } = useModal();
  const handleClick = () => setOpen(<SettingsModal {...props} />);

  return (
    <Button size="icon" onClick={handleClick}>
      <SettingsIcon />
    </Button>
  );
};

export const SettingsModal = ({
  initialData,
}: {
  initialData: SettingsStore;
}) => {
  const { isOpen, setClose } = useModal<SettingsStore>();
  const { settings, update } = useSettingsStore2();

  useEffect(() => {
    update(initialData);
  }, [initialData, update]);

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        noTitle
        className="flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsPanel2
          settings={settings}
          updateSettings={update}
          uploadFile={mockUploadFile}
          people={{}}
          connections={{
            load: () => Promise.resolve(mockConnections),
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
