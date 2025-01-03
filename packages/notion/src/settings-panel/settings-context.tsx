"use client";

import { createContext, useContext } from "react";
import type { UseThemeProps } from "next-themes/dist/types";

import { Role } from "@swy/validators";

import type { Connection } from "../tables";
import { ConnectionStrategy, Scope, UploadFile } from "../types";
import type {
  SettingsStore,
  UpdateSettings,
  WorkspaceMemberships,
} from "./index.types";
import type { TabType } from "./sidebar";

export interface SettingsContextInterface
  extends Pick<UseThemeProps, "theme" | "setTheme"> {
  settings: SettingsStore;
  scopes: Set<Scope>;
  tab: TabType;
  setTab: (tab: TabType) => void;
  updateSettings: UpdateSettings;
  uploadFile?: UploadFile;
  deleteAccount?: (data: {
    accountId: string;
    email: string;
  }) => void | Promise<void>;
  deleteWorkspace?: (workspaceId: string) => void | Promise<void>;
  resetLink?: () => void | Promise<void>;
  /** Connections */
  connections: {
    load?: () => Promise<Connection[]>;
    add?: (strategy: ConnectionStrategy) => Promise<void>;
  };
  /** People */
  people: {
    /**
     * @deprecated
     */
    load?: () => Promise<WorkspaceMemberships>;
    add?: (emails: string[], role: Role) => void | Promise<void>;
    update?: (id: string, role: Role) => void | Promise<void>;
    delete?: (id: string) => void | Promise<void>;
  };
}

export const SettingsContext = createContext<SettingsContextInterface | null>(
  null,
);

export function useSettings(): SettingsContextInterface {
  const object = useContext(SettingsContext);
  if (!object)
    throw new Error("useSettings must be used within SettingsProvider");
  return object;
}
