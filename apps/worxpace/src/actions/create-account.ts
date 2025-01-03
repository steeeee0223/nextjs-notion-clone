"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Account } from "@swy/prisma";
import { CreateAccount, type CreateAccountInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  UnauthorizedError,
  type SettingsKey,
} from "~/lib";

const handler = createMutationFetcher(CreateAccount, async (_key, { arg }) => {
  try {
    return await account.createIfNotExist(arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to create account.");
  }
});

export const createAccount: MutationFetcher<
  Account,
  Omit<SettingsKey, "workspaceId">,
  CreateAccountInput
> = ({ clerkId }, data) => handler(clerkId, data);
