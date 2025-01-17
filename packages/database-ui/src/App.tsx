import { HintProvider } from "@swy/ui/shared";

import { Database } from "./database";

import "./notion.css";

import { EditPropMenu, MenuControlProvider } from "./table-view/menus";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center gap-10">
      {/* Notion Page Content */}
      <div
        className="notion-page-content"
        // No need: shrink-0 grow flex flex-col w-full max-w-full items-start text-base z-40
      >
        {/* Wrapper for Database View */}
        {/* width, left, padding-x will change when resizing */}
        <div className="relative h-1/2 min-h-10 w-full px-[96px]">
          <Database />
        </div>
      </div>
      <HintProvider>
        <MenuControlProvider>
          <EditPropMenu
            property={{
              id: "1",
              name: "Title",
              type: "text",
              description: "aaa",
              icon: null,
            }}
          />
        </MenuControlProvider>
      </HintProvider>
    </div>
  );
}

export default App;
