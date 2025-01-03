export type * from "./index.types";
export {
  SettingsProvider as SettingsPanel,
  type SettingsProviderProps as SettingsPanelProps,
} from "./settings-provider";
export { useSettingsStore } from "./use-settings";

export * from "./modals";

/** Version 2 */
export { SettingsPanel2, type SettingsPanel2Props } from "./settings-panel-2";
export { useSettingsStore2 } from "./use-settings-2";
