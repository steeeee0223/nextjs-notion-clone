"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { CopyCard, type CopyCardInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  fetchClient,
  kanban,
  type Action,
} from "~/lib";

const handler: Action<CopyCardInput, Card> = async (_key, { arg }) => {
  const { src, dest, boardId } = arg;
  fetchClient();
  const srcCard = await kanban.getCard(src.id);
  if (!srcCard) throw new Error("Not found");

  const result = await kanban.createCard({
    ...dest,
    description: srcCard.description,
  });
  /** Activity Log */
  await createAuditLog(
    { entityId: dest.id, title: dest.title, type: "CARD" },
    "CREATE",
  );
  revalidatePath(`/kanban/${boardId}`);
  return result;
};

export const copyCard = createMutationFetcher(CopyCard, handler);
