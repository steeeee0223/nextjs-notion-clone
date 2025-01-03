import type { SettingsStore, Workspace } from "@swy/notion";
import { Role } from "@swy/validators";

import { delay } from "~/lib/utils";
import type { MockDB } from "../mock-db";

export const findAccount = async (
  db: Pick<MockDB, "accounts">,
  accountId: string,
) => {
  await delay(500);
  return await Promise.resolve(db.accounts[accountId] ?? null);
};

export const findAccountMemberships = async (
  db: Pick<MockDB, "workspaces" | "memberships">,
  accountId: string,
): Promise<Workspace[]> => {
  await delay(500);
  const mems = db.memberships.filter((mem) => mem.accountId === accountId);
  const ws = mems.map((mem) => {
    const w = db.workspaces[mem.workspaceId]!;
    const membersCount = db.memberships.filter(
      (mem) => mem.workspaceId === w.id,
    ).length;
    return {
      id: w.id,
      role: mem.role,
      name: w.name,
      icon: w.icon ?? { type: "text", text: w.name },
      members: membersCount,
      plan: w.plan,
    };
  });
  return await Promise.resolve(ws);
};

export const findWorkspace = async (
  db: Pick<MockDB, "workspaces">,
  workspaceId: string,
) => {
  await delay(200);
  const ws = db.workspaces[workspaceId];
  return await Promise.resolve(ws ?? null);
};

export const findWorkspaceMemberships = async (
  db: Pick<MockDB, "accounts" | "memberships">,
  workspaceId: string,
) => {
  await delay(500);
  const memberships = db.memberships
    .filter((mem) => mem.workspaceId === workspaceId)
    .reduce<SettingsStore["memberships"]>(
      (prev, mem) => ({
        ...prev,
        [mem.accountId]: {
          user: db.accounts[mem.accountId]!,
          ...(mem.role === Role.GUEST
            ? {
                role: mem.role,
                access: [],
              }
            : {
                role: mem.role,
                teamspaces: { current: null, options: [] },
                groups: { current: null, options: [] },
              }),
        },
      }),
      {},
    );
  return await Promise.resolve(memberships);
};
