"use client";

import React from "react";

import { Separator, Switch } from "@swy/ui/shadcn";

import "../view.css";

import { Hint } from "@swy/ui/shared";

import { MenuGroup, MenuHeader, MenuItem, PropMeta } from "../common";
import { DefaultIcon } from "../default-icon";
import * as Icon from "../icons";
import { useTableActions, useTableViewCtx } from "../table-contexts";
import { useMenuControl } from "./menu-control-context";
import { PropsMenu } from "./props-menu";
import { TypesMenu } from "./types-menu";
import { propertyTypes } from "./types-menu-options";

interface EditPropMenuProps {
  propId: string;
}

/**
 * @summary The property editing menu
 *
 * 1. ✅ Type selection
 * 2. 🚧 Type config
 * 3. ✅ Wrap in view
 * 4. ✅ Hide in view
 * 5. ✅ Duplicate property
 * 6. ✅ Delete property
 */
export const EditPropMenu: React.FC<EditPropMenuProps> = ({ propId }) => {
  const { properties, isPropertyUnique } = useTableViewCtx();
  const { updateColumn, duplicateColumn } = useTableActions();
  const { openPopover, closePopover } = useMenuControl();

  const property = properties[propId]!;

  const openPropsMenu = () => openPopover(<PropsMenu />, { x: -12, y: -12 });

  // 1. Type selection
  const openTypesMenu = () =>
    openPopover(<TypesMenu propId={property.id} />, { x: -12, y: -12 });
  // 3. Wrap in view
  const wrapProp = () =>
    updateColumn(property.id, { wrapped: !property.wrapped });
  // 4. Hide in view
  const hideProp = () => {
    updateColumn(property.id, { hidden: true });
    closePopover();
  };
  // 5. Duplicate property
  const duplicateProp = () => {
    duplicateColumn(property.id);
    closePopover();
  };
  // 6. Delete property
  const deleteProp = () => {
    updateColumn(property.id, { isDeleted: true });
    closePopover();
  };

  return (
    <>
      <MenuHeader title="Edit property" onBack={openPropsMenu} />
      <PropMeta
        property={property}
        validateName={isPropertyUnique}
        onUpdate={(data) => updateColumn(property.id, data)}
        onKeyDownUpdate={closePopover}
      />
      <MenuGroup>
        {property.type === "title" ? (
          <Hint
            side="left"
            sideOffset={6}
            description="This property's type cannot be changed."
          >
            <MenuItem
              className="px-3 data-[disabled]:pointer-events-auto data-[disabled]:cursor-not-allowed"
              disabled
            >
              <div className="mr-1.5 min-w-0 flex-auto truncate">Type</div>
              <div className="ml-auto flex min-w-0 shrink-0 items-center fill-primary/35 text-muted dark:text-muted-dark">
                <div className="flex truncate">
                  <Icon.LockedFilled className="block h-full w-3.5 shrink-0 fill-icon dark:fill-icon-dark" />
                  <div className="inline-block min-h-1 min-w-1" />
                  <span>Title</span>
                </div>
                <Icon.ChevronRight className="transition-out ml-1.5 block h-full w-3 shrink-0 fill-primary/35 dark:fill-primary/30" />
              </div>
            </MenuItem>
          </Hint>
        ) : (
          <>
            <MenuItem className="px-3" onClick={openTypesMenu}>
              <div className="mr-1.5 min-w-0 flex-auto truncate">Type</div>
              <div className="ml-auto flex min-w-0 shrink-0 items-center fill-primary/35 text-muted dark:text-muted-dark">
                <div className="flex truncate">
                  <DefaultIcon
                    type={property.type}
                    className="fill-primary/45"
                  />
                  <div className="inline-block min-h-1 min-w-1" />
                  <span>{propertyTypes[property.type]!.title}</span>
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
          </>
        )}
      </MenuGroup>
      <Separator />
      <MenuGroup>
        <MenuItem onClick={wrapProp}>
          <Icon.Undo className="rotate-x-180 mr-2 h-4 w-6 fill-icon dark:fill-icon-dark" />
          Wrap in view
          <div className="ml-auto mr-1 flex min-w-0 flex-none items-center">
            <Switch size="sm" checked={property.wrapped} />
          </div>
        </MenuItem>
        {property.type !== "title" && (
          <>
            <MenuItem onClick={hideProp}>
              <Icon.EyeHideInversePadded className="mr-2 size-6 fill-icon dark:fill-icon-dark" />
              Hide in view
            </MenuItem>
            <MenuItem onClick={duplicateProp}>
              <Icon.Duplicate className="mr-2 h-4 w-6 fill-icon dark:fill-icon-dark" />
              Duplicate property
            </MenuItem>
            <MenuItem
              variant="warning"
              className="group/trash"
              onClick={deleteProp}
            >
              <Icon.Trash className="ml-1 mr-3 h-auto w-4 fill-icon group-hover/trash:fill-red dark:fill-icon-dark" />
              Delete property
            </MenuItem>
          </>
        )}
      </MenuGroup>
    </>
  );
};
