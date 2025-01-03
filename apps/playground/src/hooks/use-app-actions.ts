"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { usePlatformStore, useSettingsStore2 } from "@swy/notion";
import { useOrigin } from "@swy/ui/hooks";

import { useAppState } from "./use-app-control";
import { useMockDB } from "./use-mock-db";

export const useAppActions = () => {
  const router = useRouter();
  const origin = useOrigin();
  const { signOut } = useAppState();
  const { findWorkspace, findWorkspaceMemberships } = useMockDB();
  /** Store */
  const setActiveWorkspace = usePlatformStore(
    (state) => state.setActiveWorkspace,
  );
  const resetStore = usePlatformStore((state) => state.reset);
  const updateSettings = useSettingsStore2((state) => state.update);
  const resetSettings = useSettingsStore2((state) => state.reset);
  /** Actions */
  const goToOnboarding = useCallback(
    () => router.push("/onboarding"),
    [router],
  );
  const selectWorkspace = useCallback(
    async (accountId: string, workspaceId: string) => {
      setActiveWorkspace(workspaceId);
      const workspace = await findWorkspace(workspaceId);
      if (!workspace) return;
      const memberships = await findWorkspaceMemberships(workspaceId);
      // const
      const { id, name, icon, domain, plan, inviteToken } = workspace;
      updateSettings({
        workspace: {
          role: memberships[accountId]?.role,
          id,
          name,
          icon: icon ?? undefined,
          domain,
          plan,
          inviteLink: `${origin}/${inviteToken}`,
        },
        memberships,
      });
      router.push(`/home/${workspaceId}`);
    },
    [
      findWorkspace,
      findWorkspaceMemberships,
      origin,
      router,
      setActiveWorkspace,
      updateSettings,
    ],
  );

  const logout = useCallback(() => {
    resetStore();
    resetSettings();
    signOut();
  }, [resetStore, resetSettings, signOut]);

  return {
    goToOnboarding,
    selectWorkspace,
    logout,
  };
};
