"use client";

import {
  SettingsPanel2,
  SettingsPanel2Props,
  usePlatformStore,
  useSettingsStore2,
  type SettingsStore,
} from "@swy/notion";
import { mockUploadFile } from "@swy/notion/mock";
import { Dialog, DialogContent, toast } from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

import { useMockDB } from "~/hooks";

export const SettingsModal = () => {
  const { isOpen, setClose } = useModal<SettingsStore>();
  /** DB */
  const { deleteFromDB, updateDB } = useMockDB();
  /** Store */
  const settings = useSettingsStore2((state) => state.settings);
  const updateSettings = useSettingsStore2((state) => state.update);
  const updateRole = useSettingsStore2((state) => state.updateRole);
  const resetSettings = useSettingsStore2((state) => state.reset);
  const deleteMembership = useSettingsStore2((state) => state.deleteMembership);
  const accountId = usePlatformStore((state) => state.user?.id);
  const workspaceId = usePlatformStore((state) => state.activeWorkspace);
  const updateAccount = usePlatformStore((state) => state.updateUser);
  const updateWorkspace = usePlatformStore((state) => state.updateWorkspace);
  const deleteWorkspace = usePlatformStore((state) => state.deleteWorkspace);
  /** Actions */
  const doNothing = () => void toast.error("Action not supported.");
  const settingsProps: SettingsPanel2Props = {
    settings,
    uploadFile: mockUploadFile,
    updateSettings: async (data) => {
      if (!accountId || !workspaceId) return;

      updateSettings(data);
      if (data.account) {
        const ok = await updateDB("accounts", (a) => a.id === accountId, {
          updatedAt: Date.now(),
          ...data.account,
        });
        if (ok) updateAccount(data.account);
      }
      if (data.workspace) {
        const ok = await updateDB("workspaces", (w) => w.id === workspaceId, {
          lastEditedAt: Date.now(),
          ...data.workspace,
        });
        if (ok) updateWorkspace(workspaceId, data.workspace);
      }
    },
    deleteAccount: doNothing,
    deleteWorkspace: async (id) => {
      await deleteFromDB("memberships", (m) => m.workspaceId === id);
      const ok = await deleteFromDB("workspaces", (w) => w.id === id);
      if (ok) {
        deleteWorkspace(id);
        setClose();
        resetSettings();
      }
    },
    people: {
      add: doNothing,
      update: async (id, role) => {
        const ok = await updateDB(
          "memberships",
          (mem) => mem.accountId === id && mem.workspaceId === workspaceId,
          { role },
        );
        if (ok) updateRole(id, role);
      },
      delete: async (id) => {
        const ok = await deleteFromDB(
          "memberships",
          (mem) => mem.accountId === id && mem.workspaceId === workspaceId,
        );
        deleteMembership(id);
        setClose();
        if (ok && id === accountId) {
          console.log("leaving workspace");
          deleteWorkspace(workspaceId!);
          resetSettings();
        }
      },
    },
    connections: {},
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        noTitle
        className="flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsPanel2 {...settingsProps} />
      </DialogContent>
    </Dialog>
  );
};
