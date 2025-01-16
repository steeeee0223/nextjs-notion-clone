"use client";

import React, { useState } from "react";

import { useFilter } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@swy/ui/shadcn";
import { Hint } from "@swy/ui/shared";

import { DefaultIcon } from "../default-icon";
import * as Icon from "../icons";
import type { PropertyType } from "../types";
import { propertyTypes } from "./props-menu-options";

interface PropertiesMenuProps {
  onSelectProp?: (type: PropertyType, name: string) => void;
}

export const PropertiesMenu: React.FC<PropertiesMenuProps> = ({
  onSelectProp,
}) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) updateSearch("");
  };

  const { search, results, updateSearch } = useFilter(
    propertyTypes,
    (prop, v) => prop.title.toLowerCase().includes(v),
  );
  const select = (type: PropertyType, name: string) => {
    onSelectProp?.(type, name);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {/* This is ActionCell! */}
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "flex w-8 cursor-pointer select-none justify-start opacity-100 transition-opacity duration-200 hover:bg-primary/5",
            "focus-visible:outline-none",
          )}
        >
          <div className="flex h-full w-8 items-center justify-center">
            <Icon.Plus className="block h-full w-3 shrink-0 fill-primary/45" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="z-[9990] w-[290px]"
        side="left"
        forceMount
        onClick={(e) => e.stopPropagation()}
      >
        <Command>
          <div className="flex min-w-0 flex-auto flex-col px-3 pb-2 pt-3">
            <Input
              className="px-1.5 py-[3px] text-sm"
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Search or add new property"
            />
          </div>
          <CommandList>
            {results && results.length > 0 && (
              <CommandGroup
                className={cn(
                  "flex flex-col gap-px px-0",
                  "[&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:mt-1.5 [&_[cmdk-group-heading]]:flex [&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:items-center [&_[cmdk-group-heading]]:truncate [&_[cmdk-group-heading]]:px-3.5 [&_[cmdk-group-heading]]:py-0 [&_[cmdk-group-heading]]:leading-[1.2] [&_[cmdk-group-heading]]:text-secondary [&_[cmdk-group-heading]]:dark:text-secondary-dark",
                )}
                heading="Type"
              >
                {results.map(({ type, title, description, icon }) => (
                  <Hint
                    side="left"
                    sideOffset={6}
                    description={description}
                    className="max-w-[282px]"
                    key={type as string}
                  >
                    <CommandItem
                      className="mx-1 gap-2"
                      value={`default-${type}`}
                      onSelect={() => select(type, title)}
                    >
                      {icon}
                      {title}
                    </CommandItem>
                  </Hint>
                ))}
              </CommandGroup>
            )}
            {search.length > 0 && (
              <CommandGroup
                className={cn(
                  "flex flex-col gap-px px-0",
                  "[&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:mt-1.5 [&_[cmdk-group-heading]]:flex [&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:items-center [&_[cmdk-group-heading]]:truncate [&_[cmdk-group-heading]]:px-3.5 [&_[cmdk-group-heading]]:py-0 [&_[cmdk-group-heading]]:leading-[1.2] [&_[cmdk-group-heading]]:text-secondary [&_[cmdk-group-heading]]:dark:text-secondary-dark",
                )}
                heading="Select to add"
              >
                <CommandItem
                  className="mx-1 gap-2"
                  value={`search-${search}`}
                  onSelect={() => select("text", search)}
                >
                  <DefaultIcon
                    type="text"
                    className="fill-icon dark:fill-icon-dark"
                  />
                  {search}
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
