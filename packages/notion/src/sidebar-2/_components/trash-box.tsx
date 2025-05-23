"use client";

import React from "react";
import { HelpCircle, Trash, Undo } from "lucide-react";

import { useFilter } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import {
  Button,
  Input,
  menuItemVariants,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@swy/ui/shadcn";
import { Hint, IconBlock, useModal } from "@swy/ui/shared";

import { BaseModal } from "../../common";
import { selectPages, usePlatformStore } from "../../slices";
import { HintItem } from "./hint-item";

interface TrashBoxProps {
  isOpen: boolean;
  isMobile?: boolean;
  onOpenChange: (open: boolean) => void;
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (id: string, type: string) => void;
}

export const TrashBox = ({
  isOpen,
  onOpenChange,
  onRestore,
  onDelete,
  onSelect,
}: TrashBoxProps) => {
  const { setOpen } = useModal();
  const pages = usePlatformStore((state) => selectPages(state, true));
  const { search, results, updateSearch } = useFilter(pages, (page, v) =>
    page.title.toLowerCase().includes(v),
  );
  /** Select */
  const handleSelect = (id: string, type: string) => {
    onSelect?.(id, type);
    onOpenChange(false);
  };
  /** Docs Actions */
  const handleRestore = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    onRestore?.(id);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setOpen(
      <BaseModal
        title="Are you sure you want to delete this page from Trash?"
        primary="Yes. Delete this page"
        secondary="Cancel"
        onTrigger={() => onDelete?.(id)}
      />,
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <HintItem
          className="mt-4"
          label="Trash"
          hint="Restore deleted pages"
          icon={Trash}
        />
      </PopoverTrigger>
      <PopoverContent
        forceMount
        className="relative bottom-10 flex h-[50vh] w-[400px] flex-col"
        side="right"
        sideOffset={-4}
        align="start"
      >
        <div className="flex w-full items-center px-3 py-2.5">
          <Input
            clear
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            onCancel={() => updateSearch("")}
            placeholder="Search pages in Trash"
          />
        </div>
        <div className="flex h-full flex-grow overflow-y-auto py-1.5">
          {!results || results.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <Trash className="block size-9 flex-shrink-0 text-[#c7c6c4]" />
              <div className="flex flex-col text-center text-sm text-[#787774]">
                <span className="font-semibold">No results</span>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex w-full flex-col px-1 pb-1 text-sm">
              {results.map(({ id, title, type, icon }) => (
                <div
                  key={id}
                  id={id}
                  tabIndex={-1}
                  role="menuitem"
                  onClick={() => handleSelect(id, type)}
                  onKeyDown={() => handleSelect(id, type)}
                  className={cn(menuItemVariants())}
                >
                  <div className="mr-2.5 flex items-center justify-center">
                    <IconBlock icon={icon ?? { type: "text", text: title }} />
                  </div>
                  <div className="mr-1.5 min-w-0 flex-auto truncate">
                    {title}
                  </div>
                  <div className="flex min-w-0 flex-none gap-1">
                    <Hint description="Restore">
                      <Button
                        variant="hint"
                        size="icon-sm"
                        onClick={(e) => handleRestore(e, id)}
                      >
                        <Undo className="size-4" />
                      </Button>
                    </Hint>
                    <Hint description="Delete from Trash">
                      <Button
                        variant="hint"
                        size="icon-sm"
                        onClick={(e) => handleDelete(e, id)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </Hint>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <footer className="mt-0.5 flex-shrink-0 border-t bg-blue/5 px-2 py-1.5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-secondary dark:text-secondary-dark">
            <span>
              Pages in Trash for over 30 days will be automatically deleted
            </span>
            <a
              href="https://www.notion.so/help/duplicate-delete-and-restore-content"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-0.5 select-none no-underline"
            >
              <Button variant="hint" size="icon-sm">
                <HelpCircle className="size-3.5 flex-shrink-0" />
              </Button>
            </a>
          </div>
        </footer>
      </PopoverContent>
    </Popover>
  );
};
