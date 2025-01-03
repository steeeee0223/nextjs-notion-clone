"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Document, ENTITY_TYPE } from "@swy/prisma";
import { type Modified } from "@swy/ui/lib";
import { DeleteDocument, type DeleteDocumentInput } from "@swy/validators";

import {
  account,
  auditLogs,
  createMutationFetcher,
  documents,
  fetchClient,
  UnauthorizedError,
  type DocumentsKey,
} from "~/lib";

const handler = createMutationFetcher(
  DeleteDocument,
  async (workspaceId, { arg }) => {
    try {
      const { clerkId } = await fetchClient();
      const inWorkspace = await account.isInWorkspace({ clerkId, workspaceId });
      if (!inWorkspace) throw new UnauthorizedError();
      const result = await documents.restore(arg);
      /** Activity Log */
      const type = result.item.type.toUpperCase() as ENTITY_TYPE;
      await auditLogs.create({
        entity: { title: result.item.title, entityId: arg.id, type },
        action: "RESTORE",
        accountId: arg.accountId,
      });
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to archive document.");
    }
  },
);

export const restoreDocument: MutationFetcher<
  Modified<Document>,
  DocumentsKey,
  DeleteDocumentInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
