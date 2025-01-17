"use client";

import React, { useState } from "react";

import {
  Button,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@swy/ui/shadcn";

import "../view.css";

import { Hint } from "@swy/ui/shared";

import { MenuGroup, MenuItem } from "../common";
import { DefaultIcon } from "../default-icon";
import * as Icon from "../icons";
import type { DatabaseProperty } from "../types";

interface EditPropMenuProps {
  property: Omit<DatabaseProperty, "width">;
  onUpdate?: (property: Partial<Omit<DatabaseProperty, "width">>) => void;
}

export const EditPropMenu: React.FC<EditPropMenuProps> = ({ property }) => {
  const [showDesc, setShowDesc] = useState(false);
  const toggleDesc = () => setShowDesc((prev) => !prev);

  return (
    <Popover open>
      <PopoverTrigger asChild>
        <Button>open edit menu</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="flex w-[290px] flex-col">
        <Header />
        <div className="flex flex-col gap-px pb-2 pt-3">
          <div className="min-height: 28px; font-size: 14px; flex w-full select-none items-center leading-[1.2]">
            <div className="ml-3 mr-auto min-w-0 shrink-0">
              {/* TODO replace with icon menu */}
              <div
                role="button"
                tabIndex={0}
                className="transition-in inline-flex size-7 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md border px-0 text-sm/[1.2]"
              >
                <DefaultIcon type="text" />
              </div>
            </div>
            <div className="ml-1.5 mr-3 min-w-0 flex-auto">
              <div className="flex">
                <Input
                  value={property.name}
                  endIcon={
                    <Hint side="top" description="Add property description">
                      <div
                        role="button"
                        tabIndex={0}
                        className="transition-in ml-1 shrink-0 grow-0 cursor-pointer select-none rounded-[20px] hover:bg-primary/5"
                        onClick={toggleDesc}
                        onKeyDown={toggleDesc}
                      >
                        <Icon.Info className="block size-4 shrink-0 fill-primary/45 hover:fill-primary/85 dark:hover:fill-primary/80" />
                      </div>
                    </Hint>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {showDesc && (
          <div className="flex min-h-7 w-full min-w-0 flex-auto select-none items-center px-3 py-2 leading-[1.2]">
            <Input
              className="h-auto text-[13px]/[20px]"
              placeholder="Add a description..."
              value={property.description}
            />
          </div>
        )}
        <MenuGroup>
          <MenuItem className="px-3">
            <div className="mr-1.5 min-w-0 flex-auto truncate">Type</div>
            <div className="ml-auto flex min-w-0 shrink-0 items-center fill-primary/35 text-muted dark:text-muted-dark">
              <div className="flex truncate">
                <DefaultIcon type="text" className="fill-primary/45" />
                <div className="inline-block min-h-1 min-w-1" />
                <span>Text</span>
              </div>
              <Icon.ChevronRight className="transition-out ml-1.5 block h-full w-3 shrink-0 fill-primary/35 dark:fill-primary/30" />
            </div>
          </MenuItem>
          <MenuItem className="px-3">
            <div className="mr-1.5 min-w-0 flex-auto truncate">
              <div className="flex items-center">
                AI Autofill
                <div className="ml-1.5 inline-block w-fit self-center whitespace-nowrap rounded-sm bg-blue/10 px-1 py-0.5 text-[11px]/[1.3] font-medium tracking-normal text-blue">
                  New
                </div>
              </div>
            </div>
            <div className="ml-auto flex min-w-0 shrink-0 items-center fill-primary/35 text-muted dark:text-muted-dark">
              <div className="flex truncate">Off</div>
              <Icon.ChevronRight className="transition-out ml-1.5 block h-full w-3 shrink-0 fill-primary/35 dark:fill-primary/30" />
            </div>
          </MenuItem>
        </MenuGroup>
        <Separator />
        <MenuGroup>
          <MenuItem>
            <Icon.Undo className="rotate-x-180 mr-2 h-4 w-6 fill-icon dark:fill-icon-dark" />
            Wrap in view
          </MenuItem>
          <MenuItem>
            <Icon.EyeHide className="mr-2 size-6 fill-icon dark:fill-icon-dark" />
            Hide in view
          </MenuItem>
          <MenuItem>
            <Icon.Duplicate className="mr-2 h-4 w-6 fill-icon dark:fill-icon-dark" />
            Duplicate property
          </MenuItem>
          <MenuItem variant="warning" className="group/trash">
            <Icon.Trash className="ml-1 mr-3 h-auto w-4 fill-icon group-hover/trash:fill-red dark:fill-icon-dark" />
            Delete property
          </MenuItem>
        </MenuGroup>
      </PopoverContent>
    </Popover>
  );
};

interface HeaderProps {
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <div className="flex h-[42px] shrink-0 items-center px-4 pb-1.5 pt-3.5">
      <Button
        variant="hint"
        className="transition-in -ml-0.5 mr-2 h-[22px] w-6 shrink-0 rounded-md p-0"
        onClick={onBack}
      >
        <Icon.ArrowLeftThick className="block size-4 shrink-0 fill-primary/45" />
      </Button>
      <span className="grow truncate text-sm font-semibold">Edit property</span>
      <PopoverClose asChild>
        <Button variant="close" size="circle">
          <Icon.Close className="block h-full w-3.5 shrink-0 fill-secondary dark:fill-primary/45" />
        </Button>
      </PopoverClose>
    </div>
  );
};
