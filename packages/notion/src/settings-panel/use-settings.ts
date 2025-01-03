"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Plan, Role } from "@swy/validators";

import type { SettingsStore as Settings, UpdateSettings } from "./index.types";
import { TabType } from "./sidebar";

interface SettingsStore extends Settings {
  tab: TabType;
  setTab: (tab: TabType) => void;
  update: (...params: Parameters<UpdateSettings>) => void;
  reset: () => void;
}

const initialSettings: Settings = {
  workspace: {
    id: "",
    name: "",
    icon: { type: "lucide", name: "user" },
    domain: "",
    inviteLink: "",
    plan: Plan.FREE,
    role: Role.GUEST,
  },
  account: {
    id: "",
    name: "",
    avatarUrl: "",
    preferredName: "",
    email: "",
    language: "en",
  },
  memberships: {},
};

/**
 * @deprecated
 */
export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialSettings,
        tab: "my-settings",
        setTab: (tab) => set((state) => ({ ...state, tab })),
        update: ({ workspace, account, memberships }) =>
          set((state) => ({
            workspace: { ...state.workspace, ...workspace },
            account: { ...state.account, ...account },
            memberships: { ...state.memberships, ...memberships },
          })),
        reset: () => set({ ...initialSettings, tab: "my-settings" }),
      }),
      { name: "settings" },
    ),
  ),
);
