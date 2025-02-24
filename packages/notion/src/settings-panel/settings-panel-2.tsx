"use client";

import React, { useMemo, useRef, useState } from "react";

import { I18nProvider } from "@swy/i18n";
import { useTheme } from "@swy/ui/shadcn";
import { HintProvider, ModalProvider } from "@swy/ui/shared";

import { getScopes } from "../scopes";
import {
  SettingsContext,
  type SettingsContextInterface,
} from "./settings-context";
import { SettingsPanel } from "./settings-panel";
import type { TabType } from "./sidebar";

export type SettingsPanel2Props = Omit<
  SettingsContextInterface,
  "scopes" | "tab" | "setTab" | "theme" | "setTheme"
>;

export const SettingsPanel2: React.FC<SettingsPanel2Props> = ({
  settings,
  ...actions
}) => {
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = useState<TabType>("my-settings");

  const actionsRef = useRef(actions);
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      tab,
      setTab,
      settings,
      scopes: getScopes(settings.workspace.plan, settings.workspace.role),
      ...actionsRef.current,
    }),
    [theme, setTheme, tab, setTab, settings],
  );

  return (
    <I18nProvider language={settings.account.language} defaultNS="settings">
      <HintProvider delayDuration={500}>
        <SettingsContext.Provider value={contextValue}>
          <ModalProvider>
            <SettingsPanel />
          </ModalProvider>
        </SettingsContext.Provider>
      </HintProvider>
    </I18nProvider>
  );
};
