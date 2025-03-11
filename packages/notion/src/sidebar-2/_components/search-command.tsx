"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";

import { useFilter } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  Input,
} from "@swy/ui/shadcn";
import { IconBlock, useModal } from "@swy/ui/shared";

import { generateDefaultIcon, Icon, toDateString } from "../../common";
import { selectPages, usePlatformStore } from "../../slices";

interface SearchCommandProps {
  workspaceName: string;
  onSelect?: (id: string, group: string) => void;
  onOpenTrash?: (open: boolean) => void;
}

export const SearchCommand: React.FC<SearchCommandProps> = ({
  workspaceName,
  onSelect,
  onOpenTrash,
}) => {
  const { isOpen, setClose } = useModal();
  const pages = usePlatformStore((state) => selectPages(state, false));
  const { search, results, updateSearch } = useFilter(pages, (page, v) =>
    page.title.toLowerCase().includes(v),
  );
  /** Search */
  const jumpToTrash = () => {
    setClose();
    onOpenTrash?.(true);
  };
  const handleSelect = (id: string, group: string) => {
    onSelect?.(id, group);
    setClose();
  };

  return (
    <CommandDialog
      className="max-h-[max(50vh,570px)] min-h-[max(50vh,570px)] w-full max-w-[755px] rounded-[12px] bg-modal"
      open={isOpen}
      onOpenChange={setClose}
      shouldFilter={false}
    >
      <div className="z-10 flex h-12 w-full flex-shrink-0 flex-grow-0 overflow-hidden border-b bg-transparent px-1">
        <Input
          search
          clear
          variant="flat"
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          onCancel={() => updateSearch("")}
          placeholder={`Search in ${workspaceName}...`}
          className="h-full w-full min-w-0 px-3 text-lg/[27px]"
        />
      </div>
      <CommandList
        className={cn(
          "h-full min-h-0 flex-grow transform",
          !results && "flex flex-col justify-center",
        )}
      >
        {results ? (
          <CommandGroup className="py-2" heading="Best matches">
            {results.map(({ id, title, icon, type, lastEditedAt }) => (
              <CommandItem
                key={id}
                value={`${title}-${id}`}
                title={title}
                onSelect={() => handleSelect(id, type)}
                className="group min-h-9"
              >
                <div className="mr-2.5 flex items-center justify-center">
                  <IconBlock
                    icon={icon ?? generateDefaultIcon(type)}
                    className="leading-[1.2]"
                  />
                </div>
                <div className="mr-1.5 min-w-0 flex-auto truncate">{title}</div>
                <div className="flex-0 flex h-3 items-center text-xs text-muted dark:text-muted-dark">
                  <span className="group-aria-selected:hidden">
                    {toDateString(lastEditedAt)}
                  </span>
                  <span className="hidden size-3 group-aria-selected:block">
                    <Icon.Enter className="flex-shrink-0 fill-primary/45" />
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : (
          <CommandEmpty className="my-auto flex w-full select-none items-center py-8 leading-[1.2]">
            <div className="mx-3 min-w-0 flex-auto">
              <div className="truncate">
                <div
                  role="alert"
                  className="m-0 font-medium text-secondary dark:text-secondary-dark"
                >
                  No results
                </div>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-normal text-sm">
                <div className="text-muted dark:text-muted-dark">
                  Some results may be in your deleted pages.
                  <br />
                  <button
                    onClick={jumpToTrash}
                    className="inline cursor-pointer select-none leading-6 text-blue"
                  >
                    Search deleted pages
                  </button>
                </div>
              </div>
            </div>
          </CommandEmpty>
        )}
      </CommandList>
      <CommandSeparator />
      <footer className="flex h-7 w-full flex-shrink-0 flex-grow-0 select-none items-center truncate text-sm/[1.2] text-muted dark:text-muted-dark">
        <div className="mx-3 min-w-0 flex-auto">
          <ul className="m-0 inline-flex list-none items-center gap-5 truncate p-0">
            <li className="flex h-max items-center gap-1.5">
              <ArrowUpDown className="inline size-3 flex-shrink-0 text-primary/45" />
              Select
            </li>
            <li className="flex h-max items-center gap-1.5">
              <Icon.Enter className="inline size-3 flex-shrink-0 fill-primary/45" />
              Open
            </li>
          </ul>
        </div>
      </footer>
    </CommandDialog>
  );
};
