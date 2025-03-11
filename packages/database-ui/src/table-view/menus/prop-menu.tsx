"use client";

import React from "react";

import { Separator, Switch } from "@swy/ui/shadcn";

import "../view.css";

import { MenuGroup, MenuItem, PropMeta } from "../common";
import * as Icon from "../icons";
import { useTableActions, useTableViewCtx } from "../table-contexts";
import { EditPropMenu } from "./edit-prop-menu";
import { useMenuControl } from "./menu-control-context";

interface PropMenuProps {
  propId: string;
  rect?: DOMRect;
}

/**
 * @summary The definition of the property
 *
 * 1. ✅ Edit property: opens `EditPropMenu`
 * 2. 🚧 Sorting
 * 3. 🚧 Filter
 * 4. ✅ Hide in view
 * 5. ✅ Freeze up to column
 * 6. ✅ Duplicate property
 * 7. ✅ Delete property
 * 8. ✅ Wrap column
 */
export const PropMenu: React.FC<PropMenuProps> = ({ propId, rect }) => {
  const { table, properties, isPropertyUnique, canFreezeProperty } =
    useTableViewCtx();
  const { updateColumn, duplicateColumn, freezeColumns } = useTableActions();
  const { openPopover, closePopover } = useMenuControl();

  const property = properties[propId]!;

  // 1. Edit property
  const openEditPropMenu = () => {
    openPopover(<EditPropMenu propId={propId} />, {
      x: rect?.x,
      y: rect?.bottom,
    });
  };
  // 4. Hide in view
  const hideProp = () => {
    updateColumn(property.id, { hidden: true });
    closePopover();
  };
  // 5. Pin columns
  const canFreeze = canFreezeProperty(property.id);
  const canUnfreeze = table.getColumn(property.id)?.getIsLastColumn("left");
  const pinColumns = () => {
    freezeColumns(canUnfreeze ? null : property.id);
    closePopover();
  };
  // 6. Duplicate property
  const duplicateProp = () => {
    duplicateColumn(property.id);
    closePopover();
  };
  // 7. Delete property
  const deleteProp = () => {
    updateColumn(property.id, { isDeleted: true });
    closePopover();
  };
  // 8. Wrap in view
  const wrapProp = () =>
    updateColumn(property.id, { wrapped: !property.wrapped });

  return (
    <>
      <PropMeta
        property={property}
        validateName={isPropertyUnique}
        onUpdate={(data) => updateColumn(property.id, data)}
        onKeyDownUpdate={closePopover}
      />
      <MenuGroup>
        <MenuItem className="px-3" onClick={openEditPropMenu}>
          <Icon.Options className="mr-3 block h-full w-4 shrink-0 fill-inherit" />
          Edit property
        </MenuItem>
      </MenuGroup>
      <Separator />
      <MenuGroup>
        {property.type !== "title" && (
          <MenuItem onClick={hideProp}>
            <Icon.EyeHideInversePadded className="mr-2 size-6 fill-icon dark:fill-icon-dark" />
            Hide in view
          </MenuItem>
        )}
        <MenuItem disabled={!canFreeze} onClick={pinColumns}>
          {canUnfreeze ? (
            <>
              <Icon.PinStrikeThrough className="ml-1.5 mr-3 h-full w-3 fill-icon dark:fill-icon-dark" />
              Unfreeze columns
            </>
          ) : (
            <>
              <Icon.Pin className="ml-1.5 mr-3 h-full w-3 fill-icon dark:fill-icon-dark" />
              Freeze up to column
            </>
          )}
        </MenuItem>
        {property.type !== "title" && (
          <>
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
      <Separator />
      <MenuGroup>
        <MenuItem onClick={wrapProp}>
          Wrap column
          <div className="ml-auto mr-1 flex min-w-0 flex-none items-center">
            <Switch size="sm" checked={property.wrapped} />
          </div>
        </MenuItem>
      </MenuGroup>
    </>
  );
};
