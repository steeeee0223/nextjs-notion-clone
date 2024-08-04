import { auth } from "@clerk/nextjs/server";
import type * as z from "zod";

import { COLORS } from "~/constants/theme";
import { UnauthorizedError } from "./errors";
import type { Action, Client } from "./types";

export function isAuthenticated(): boolean {
  const { userId } = auth();
  return !!userId;
}

/**
 * Utility for authorization
 */
export function fetchClient(): Pick<Client, "type" | "clerkId"> {
  const { userId, orgId } = auth();
  if (!userId) throw new UnauthorizedError();

  if (!orgId) {
    /** @todo Admin role */
    /** User role */
    return { type: "personal", clerkId: userId };
  } else {
    return { type: "organization", clerkId: orgId };
  }
}
/**
 * Utility for fetching url
 */
export function fetchUrl<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json() as T);
}
/**
 * Utility for parsing boolean params in url
 */
export function parseBool(x?: string | null): boolean | undefined {
  switch (true) {
    case x === null || x === undefined:
      return undefined;
    case x === "true":
      return true;
    case x === "false":
      return false;
    default:
      throw new Error(`Invalid argument: ${x}`);
  }
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]!;
}

export function createMutationFetcher<Input, Output>(
  schema: z.Schema<Input>,
  handler: Action<Input, Output>,
): Action<Input, Output> {
  return async (key, { arg }) => {
    const result = schema.safeParse(arg);
    if (!result.success) throw result.error;
    return await handler(key, { arg: result.data });
  };
}
