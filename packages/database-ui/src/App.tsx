import "./notion.css";

import { Database } from "./database";
import { ThemeProvider, ThemeToggle } from "./theme";

function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen w-screen flex-col items-center gap-10 bg-main">
        <ThemeToggle />
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
      </div>
    </ThemeProvider>
  );
}

export default App;
