"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import { createUserSlice, initialUserState, type UserSlice } from "./account";
import { createPageSlice, initialPageState, type PageSlice } from "./page";
import {
  createWorkspaceSlice,
  initialWorkspaceState,
  type WorkspaceSlice,
} from "./workspace";

interface PlatformActions {
  reset: () => void;
}
export type PlatformStore = UserSlice &
  WorkspaceSlice &
  PageSlice &
  PlatformActions;

const useStore = create<PlatformStore, [["zustand/persist", unknown]]>(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createWorkspaceSlice(...a),
      ...createPageSlice(...a),
      reset: () =>
        a[0]({
          ...initialUserState,
          ...initialWorkspaceState,
          ...initialPageState,
        }),
    }),
    { name: "platform" },
  ),
);

export const usePlatformStore = <T>(selector: (state: PlatformStore) => T) =>
  useStore<T>(useShallow(selector));
