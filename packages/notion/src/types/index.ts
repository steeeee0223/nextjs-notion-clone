import { IconInfo } from "@swy/ui/shared";
import { Role, type CoverImage } from "@swy/validators";

export type UploadFile = (
  file: File,
  options?: {
    /** @params replaceTargetUrl: provide the URL to replaced with */
    replaceTargetUrl?: string;
  },
) => Promise<{ url: string }>;

export type ConnectionStrategy =
  | "slack"
  | "google-drive"
  | "figma"
  | "github"
  | "gitlab"
  | "grid"
  | "jira";

export type PartialRole = Exclude<Role, Role.GUEST>;

export enum Scope {
  /** Workspace settings */
  WorkspaceUpdate = "workspace:update", // ✅ owner
  /** People */
  MemberInvite = "people:invite", // ❌ plan: education, role: member
  MemberRead = "people:read", // ❌ guest
  MemberAdd = "people:add", // ❌ plan: education
  MemberAddRequest = "people:add:request", // role: member
  MemberUpdate = "people:update", // only workspace owner can upgrade/downgrade/delete member/guest(s)
  GroupEnable = "people:group:enable", // ❌ plan: education, free
  /** Plans */
  Upgrade = "plan:upgrade", // ✅ owner
}

export interface Page {
  id: string;
  title: string;
  type: string;
  isArchived: boolean;
  coverImage: CoverImage | null;
  icon: IconInfo | null;
  parentId: string | null;
  isPublished: boolean;
  isFavorite: boolean;
  url?: string; // page link, starting with `/`
  createdAt: number; // timestamp in 'ms'
  lastEditedAt: number; // timestamp in 'ms'
  createdBy: string;
  lastEditedBy: string;
}

export type UpdatePageParams = Partial<
  Pick<Page, "title" | "icon" | "isFavorite" | "isArchived">
>;
