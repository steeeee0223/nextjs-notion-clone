"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Plan, Role } from "@swy/validators";

import type {
  SettingsStore as Settings,
  UpdateSettingsParams,
} from "./index.types";

interface SettingsStore2 {
  settings: Settings;
  update: (data: UpdateSettingsParams) => void;
  updateRole: (accountId: string, role: Role) => void;
  deleteMembership: (accountId: string) => void;
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

export const useSettingsStore2 = create<SettingsStore2>()(
  devtools(
    persist(
      (set) => ({
        settings: initialSettings,
        update: ({ workspace, account, memberships }) =>
          set((state) => ({
            ...state,
            settings: {
              workspace: { ...state.settings.workspace, ...workspace },
              account: { ...state.settings.account, ...account },
              memberships: { ...state.settings.memberships, ...memberships },
            },
          })),
        updateRole: (accountId, role) =>
          set((state) => {
            if (!state.settings.memberships[accountId]) return state;
            state.settings.memberships[accountId] = {
              user: state.settings.memberships[accountId].user,
              ...(role === Role.GUEST
                ? { role, access: [] }
                : {
                    role,
                    teamspaces: { current: null, options: [] },
                    groups: { current: null, options: [] },
                  }),
            };
            return state;
          }),
        deleteMembership: (accountId) =>
          set((state) => {
            delete state.settings.memberships[accountId];
            return state;
          }),
        reset: () => set({ settings: initialSettings }),
      }),
      { name: "settings-v2" },
    ),
  ),
);
