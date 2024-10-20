import React from "react";

import { createClient, createRoomContext, RoomProvider } from "@swy/liveblocks";
import { useSidebarLayout } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import { Navbar, PageHeader, PageProvider, Sidebar } from "@swy/ui/notion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@swy/ui/shadcn";

import {
  mockConnections,
  mockLogs,
  mockMemberships,
  mockPages,
  mockSettings,
} from "../../__mock__";
import { useDocuments } from "./use-documents";

/** Setup Liveblocks */
const authEndpoint = "/api/liveblocks";
const client = createClient({ authEndpoint });
const { useSelf, useOthers } = createRoomContext(client);

interface LayoutProps extends React.PropsWithChildren {
  pageId: string;
}

export const LayoutWithLiveblocks = ({ pageId, children }: LayoutProps) => {
  return (
    <RoomProvider authEndpoint={authEndpoint} roomId={pageId}>
      <Layout pageId={pageId}>{children}</Layout>
    </RoomProvider>
  );
};

export const Layout = ({ pageId, children }: LayoutProps) => {
  const { minSize, ref, collapse, expand, isResizing, isMobile } =
    useSidebarLayout("group", "sidebar", 240);
  const currentUser = useSelf();
  const otherUsers = useOthers();
  const { isLoading, fetchPages } = useDocuments({
    workspaceId: "workspace-0",
  });

  return (
    <ResizablePanelGroup
      id="group"
      direction="horizontal"
      className="h-screen w-screen"
    >
      <ResizablePanel
        id="sidebar"
        ref={ref}
        className={cn(isResizing && "transition-all duration-300 ease-in-out")}
        defaultSize={isMobile ? 0 : undefined}
        minSize={isMobile ? 0 : minSize}
        maxSize={isMobile ? 100 : 50}
        collapsible
        order={1}
      >
        <Sidebar
          className="w-full"
          isMobile={isMobile}
          collapse={collapse}
          settingsProps={{
            settings: mockSettings,
            onFetchConnections: () => Promise.resolve(mockConnections),
            onFetchMemberships: () => Promise.resolve(mockMemberships),
          }}
          pageHandlers={{
            isLoading,
            fetchPages,
          }}
          workspaceHandlers={{}}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={2}
        className={cn(isResizing && "transition-all duration-300 ease-in-out")}
      >
        <PageProvider
          className="order-3 flex size-full flex-col overflow-hidden"
          page={mockPages[pageId]!}
          currentUser={currentUser}
          otherUsers={otherUsers}
          fetchLogs={() => Promise.resolve(mockLogs)}
        >
          <Navbar
            className="w-full"
            onResetWidth={expand}
            isCollapsed={ref.current?.isCollapsed()}
          />
          <main className="h-full">
            <PageHeader unsplashAPIKey="UNSPLASH_API_KEY" />
            {pageId === "#" ? (
              <div className="px-[54px] text-[32px]">Welcome to WorXpace</div>
            ) : (
              children
            )}
          </main>
        </PageProvider>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};