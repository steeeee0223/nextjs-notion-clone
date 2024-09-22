import { useTranslation } from "@acme/i18n";

import { Select } from "@/components/custom/select";
import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, Spacing, TextLink } from "../_components";
import { useSettings } from "../settings-context";

export const Settings = () => {
  const { theme, setTheme } = useSettings();
  /** i18n */
  const { t } = useTranslation("settings");
  const {
    title,
    "my-settings": mySettings,
    "date-time": dateTime,
    privacy,
  } = t("my-settings", { returnObjects: true });

  return (
    <>
      <Section title={title}>
        <SectionItem {...mySettings.appearance}>
          <Select
            options={mySettings.appearance.options}
            defaultValue={theme ?? "system"}
            onChange={setTheme}
            side="left"
          />
        </SectionItem>
        <Spacing size="sm" />
        <SectionItem {...mySettings["open-on-start"]}>
          <Select
            options={mySettings["open-on-start"].options}
            defaultValue="top"
            side="left"
          />
        </SectionItem>
        <Spacing size="sm" />
        <SectionItem
          title={mySettings["open-links"].title}
          description={
            <TextLink
              i18nKey="my-settings.my-settings.open-links.description"
              href="https://www.notion.so/desktop"
            />
          }
        >
          <Switch size="sm" />
        </SectionItem>
      </Section>
      <Spacing />
      <Section title="Date & time">
        <SectionItem {...dateTime["set-timezone"]}>
          <Switch size="sm" />
        </SectionItem>
        <Spacing size="sm" />
        <SectionItem {...dateTime.timezone}></SectionItem>
      </Section>
      <Spacing />
      <Section title="Privacy">
        <SectionItem
          title={privacy.cookie.title}
          description={
            <TextLink
              i18nKey="my-settings.privacy.cookie.description"
              href="https://notion.notion.site/Cookie-Notice-bc186044eed5488a8387a9e94b14e58c"
            />
          }
        />
        <Spacing size="sm" />
        <SectionItem
          title={privacy["view-history"].title}
          description={
            <TextLink
              i18nKey="my-settings.privacy.view-history.description"
              href="https://www.notion.so/help/page-analytics"
            />
          }
        >
          <Select
            options={privacy["view-history"].options}
            defaultValue="yes"
            side="left"
          />
        </SectionItem>
        <Spacing size="sm" />
        <SectionItem
          title={privacy["discover-profile"].title}
          description={
            <TextLink
              i18nKey="my-settings.privacy.discover-profile.description"
              href="https://www.notion.so/help/account-settings#profile-settings"
            />
          }
        >
          <Switch size="sm" />
        </SectionItem>
      </Section>
    </>
  );
};
