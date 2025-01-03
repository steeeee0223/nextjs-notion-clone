import { LOCALE } from "@swy/i18n";
import type { IconInfo, ModalData } from "@swy/ui/shared";
import { Plan, Role, type User } from "@swy/validators";

import type { GuestRow, MemberRow } from "../tables";

export interface WorkspaceStore {
  id: string;
  name: string;
  icon: IconInfo;
  domain: string;
  /** People */
  inviteLink: string;
  /** Plans */
  plan: Plan;
  /** Current account */
  role: Role;
}
export interface AccountStore extends User {
  /** My Account */
  preferredName: string;
  hasPassword?: boolean;
  /** Region */
  language?: LOCALE;
}

type Membership =
  | ({ role: Role.OWNER | Role.MEMBER } & MemberRow)
  | ({ role: Role.GUEST } & GuestRow);

export interface SettingsStore extends ModalData {
  workspace: WorkspaceStore;
  account: AccountStore;
  /**
   * key: userId
   */
  memberships: Record<string, Membership>;
}

export interface UpdateSettingsParams {
  workspace?: Partial<WorkspaceStore>;
  account?: Partial<AccountStore>;
  memberships?: Record<string, Membership>;
}
export type UpdateSettings = (
  data: UpdateSettingsParams,
) => void | Promise<void>;

export interface WorkspaceMemberships {
  members: MemberRow[];
  guests: GuestRow[];
}
