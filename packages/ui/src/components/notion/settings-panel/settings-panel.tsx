"use client";

import { useState } from "react";

import SettingsBody from "./settings-body";
import { useSettings } from "./settings-context";
import { account, Tab, User, workspace, type TabType } from "./sidebar";

const styles = {
  panel:
    "max-h-[720px] max-w-[1150px] w-[calc(100vw-100px)] h-[calc(100vh-100px)] rounded shadow flex z-[99999] p-0 border-none",
  sidebar:
    "grow-0 flex-shrink-0 w-[240px] rounded-tl-sm rounded-bl-sm bg-primary/5 p-1 overflow-y-auto",
  sidebarSection: "py-2 text-primary",
  title: "px-4 py-1 text-xs font-extrabold text-primary/65",
  body: "grow-1 overflow-y-scroll w-full px-[60px] py-9",
};

export const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>("my-settings");
  const {
    settings: { user },
  } = useSettings();

  return (
    <div className="flex w-full">
      <div className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <div className={styles.title}>Account</div>
          <User user={user} />
          {account.map(({ name, value, Icon }, i) => (
            <Tab
              key={i}
              name={name}
              isActive={activeTab === value}
              Icon={Icon}
              onClick={() => setActiveTab(value)}
            />
          ))}
        </div>
        <div className={styles.sidebarSection}>
          <div className={styles.title}>Workspace</div>
          {workspace.map(({ name, value, Icon }, i) => (
            <Tab
              key={i}
              name={name}
              isActive={activeTab === value}
              Icon={Icon}
              onClick={() => setActiveTab(value)}
            />
          ))}
        </div>
      </div>
      <div className={styles.body}>
        <SettingsBody activeTab={activeTab} />
      </div>
    </div>
  );
};
