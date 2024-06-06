import { NotImplemented, Section } from "./_components";
import {
  Account,
  Connections,
  Identity,
  Notifications,
  Region,
  Settings,
} from "./body";
import { workspace, type TabType } from "./sidebar";

interface SettingsBodyProps {
  activeTab: TabType;
}

const SettingsBody = ({ activeTab }: SettingsBodyProps) => {
  const tab = workspace.find(({ value }) => value === activeTab)!;

  switch (activeTab) {
    case "my-account":
      return <Account />;
    case "my-settings":
      return <Settings />;
    case "my-notifications":
      return <Notifications />;
    case "my-connections":
      return <Connections />;
    case "language-region":
      return <Region />;
    case "identity":
      return <Identity />;
    default:
      return (
        <Section title={tab.name}>
          <NotImplemented />
        </Section>
      );
  }
};

export default SettingsBody;
