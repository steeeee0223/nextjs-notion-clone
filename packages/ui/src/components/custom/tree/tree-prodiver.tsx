"use client";

import {
  useCallback,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";
import { toast } from "sonner";
import useSWR, { type Fetcher } from "swr";

import type { Groups, TreeItem } from "./index.types";
import { TreeActionContext } from "./tree-action-context";
import { treeReducer, type TreeReducer } from "./tree-actions";
import { TreeContext, type TreeContextInterface } from "./tree-context";

interface TreeProviderProps extends PropsWithChildren {
  queryKey?: string;
  className?: string;
  groups?: Groups;
  fetchItems: Fetcher<TreeItem[]>;
  isItemActive?: (id: string) => boolean;
  onClickItem?: (id: string) => void;
}

export function TreeProvider({
  className,
  queryKey,
  children,
  groups,
  fetchItems,
  isItemActive,
  onClickItem,
}: TreeProviderProps) {
  const $initialItems = { ids: [], entities: {} };
  const [state, dispatch] = useReducer<TreeReducer>(treeReducer, $initialItems);
  const { data, isLoading } = useSWR<TreeItem[], string>(
    `ui:tree:${queryKey}`,
    fetchItems,
    {
      onSuccess: (data) => dispatch({ type: "set", payload: data }),
      onError: (e) => toast.error(e),
    },
  );

  const treeItems = useMemo(() => Object.values(state.entities), [state]);
  const getChildren = useCallback(
    ($parentId: string | null, $group: Groups[number] | null) =>
      treeItems.filter(
        ({ parentId, group }) => $group === group && $parentId === parentId,
      ),
    [treeItems],
  );
  const getGroup = useCallback(
    ($group: Groups[number]) =>
      treeItems.filter(({ group }) => group === $group),
    [treeItems],
  );
  const treeContextValues: TreeContextInterface = {
    isLoading: isLoading || !data,
    groups,
    treeItems,
    getGroup,
    getChildren,
    isItemActive,
    onClickItem,
  };

  return (
    <TreeContext.Provider value={treeContextValues}>
      <TreeActionContext.Provider value={{ dispatch }}>
        <div className={className}>{children}</div>
      </TreeActionContext.Provider>
    </TreeContext.Provider>
  );
}
