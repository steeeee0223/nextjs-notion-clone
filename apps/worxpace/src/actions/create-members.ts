"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { ClerkAPIResponseError } from "@clerk/shared";
import type { MutationFetcher } from "swr/mutation";

import { CreateMembers, type CreateMembersInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  invitation,
  membership,
  UnauthorizedError,
  type SettingsPeopleKey,
} from "~/lib";

const handler = createMutationFetcher(CreateMembers, async (_key, { arg }) => {
  const { emails, workspaceId, role, inviteLink } = arg;
  try {
    const accounts = await account.byEmails(emails);
    const existing = new Map(accounts.map(({ id, email }) => [email, id]));
    if (existing.size > 0)
      await membership.createMany({
        workspaceId,
        accountIds: [...existing.values()],
        role,
      });
    const nonExistingEmails = emails.filter((email) => !existing.has(email));
    if (nonExistingEmails.length > 0) {
      for (const email of nonExistingEmails) {
        const res = await clerkClient.invitations.createInvitation({
          emailAddress: email,
          redirectUrl: inviteLink,
          ignoreExisting: true,
        });
        await invitation.create({
          workspaceId,
          role,
          email,
          clerkInviteId: res.id,
        });
      }
    }
    return { existing: [...existing.keys()], nonExistingEmails };
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    if (error instanceof ClerkAPIResponseError) {
      console.log(`[${error.status}] ${error.name} - ${error.message}`);
    }
    throw new Error("Failed to create members.");
  }
});

export const addMembers: MutationFetcher<
  { existing: string[]; nonExistingEmails: string[] },
  SettingsPeopleKey,
  CreateMembersInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
