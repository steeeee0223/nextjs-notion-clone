import type { SettingsStore, WorkspaceMemberships } from "@swy/notion";
import { randomItem } from "@swy/ui/lib";
import { Role } from "@swy/validators";

import { mockUsers } from "./users";
import { workspaces } from "./workspaces";

export const mockConnections = [
  {
    id: "connection-1",
    connection: { type: "github", account: "shadcn-ui" },
    scopes: ["Can preview links", "Can content"],
  },
];

const pageAccesses = [
  [
    { id: "page1", name: "Page 1", scope: "Full access" },
    { id: "page2", name: "Page 2", scope: "Can view" },
  ],
  [
    { id: "page1", name: "Page 1", scope: "Can view" },
    { id: "page2", name: "Page 2", scope: "Can view" },
  ],
  [{ id: "page1", name: "Page 1", scope: "Can view" }],
  [],
];

export const mockSettings: SettingsStore = {
  workspace: { ...workspaces[0]!, domain: "fake-domain", inviteLink: "#" },
  account: { ...mockUsers[0]!, preferredName: "Jonathan", language: "en" },
  memberships: mockUsers.reduce(
    (acc, user, i) => ({
      ...acc,
      get [user.id]() {
        switch (i) {
          case 0:
            return {
              user,
              teamspaces: {
                current: "1",
                options: [{ id: "1", name: "General", members: 29 }],
              },
              groups: { current: null, options: [] },
              role: Role.OWNER,
            };
          case 1:
            return {
              user,
              teamspaces: { current: null, options: [] },
              groups: { current: null, options: [] },
              role: Role.MEMBER,
            };
          default:
            return {
              role: Role.GUEST,
              user,
              access: randomItem(pageAccesses),
            };
        }
      },
    }),
    {},
  ),
};

export const mockMemberships = Object.values(
  mockSettings.memberships,
).reduce<WorkspaceMemberships>(
  (acc, mem) =>
    mem.role === Role.GUEST
      ? { members: acc.members, guests: [...acc.guests, mem] }
      : { members: [...acc.members, mem], guests: acc.guests },
  { members: [], guests: [] },
);
