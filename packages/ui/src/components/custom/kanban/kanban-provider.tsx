"use client";

import type { PropsWithChildren } from "react";
import { useReducer, useState } from "react";
import { toast } from "sonner";

import { useFetch } from "@/hooks";
import type { ActionState } from "@/lib";
import type { KanbanHandlers, KanbanItem, KanbanList } from "./index.types";
import type { KanbanReducer } from "./kanban-actions";
import { kanbanReducer } from "./kanban-actions";
import { KanbanContainer } from "./kanban-container";
import type { KanbanContextInterface } from "./kanban-context";
import { KanbanContext } from "./kanban-context";
import { findMaxOrder } from "./utils";

interface KanbanProviderProps extends PropsWithChildren, KanbanHandlers {
  className?: string;
  fetchLists: () => Promise<ActionState<never, KanbanList[]>>;
  onOpenItem?: (item: KanbanItem) => void;
}

export function KanbanProvider({
  className,
  children,
  fetchLists,
  ...handlers
}: KanbanProviderProps) {
  /** Kanban Item */
  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null);
  /** Kanban Lists */
  const $initialLists = { ids: [], entities: {} };
  const [state, dispatch] = useReducer<KanbanReducer>(
    kanbanReducer,
    $initialLists,
  );
  const { data, isLoading } = useFetch<KanbanList[]>(fetchLists, {
    onSuccess: (data) => dispatch({ type: "set", payload: data }),
    onError: (e) => toast.error(e),
  });

  const kanbanLists = Object.values(state.entities);
  console.log(`kanbanLists:`, kanbanLists);
  const kanbanContextValues: KanbanContextInterface = {
    isLoading: isLoading || !data,
    kanbanLists,
    activeItem,
    dispatch,
    setActiveItem,
    getKanbanItem: (listId, itemId) =>
      state.entities[listId]?.items.find(({ id }) => itemId === id),
    getKanbanList: (listId) => state.entities[listId],
    getMaxItemOrder: (listId) => findMaxOrder(state.entities[listId]!.items),
    getMaxListOrder: () => findMaxOrder(Object.values(state.entities)),
    ...handlers,
  };

  return (
    <KanbanContext.Provider value={kanbanContextValues}>
      <div className={className}>
        <KanbanContainer />
      </div>
      <div>{children}</div>
    </KanbanContext.Provider>
  );
}