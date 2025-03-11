"use client";

import { useMemo } from "react";

import { Button } from "@swy/ui/shadcn";
import { IconBlock } from "@swy/ui/shared";

import { MenuGroup, MenuHeader, MenuItem } from "../common";
import { DefaultIcon } from "../default-icon";
import * as Icon from "../icons";
import { useTableActions, useTableViewCtx } from "../table-contexts";
import type { DatabaseProperty } from "../types";
import { useMenuControl } from "./menu-control-context";
import { PropsMenu } from "./props-menu";

export const DeletedPropsMenu = () => {
  const { properties } = useTableViewCtx();
  const { updateColumn, deleteColumn } = useTableActions();
  const { openPopover } = useMenuControl();

  const openPropsMenu = () => openPopover(<PropsMenu />, { x: -12, y: -12 });

  const deletedProps = useMemo(
    () => Object.values(properties).filter((prop) => prop.isDeleted),
    [properties],
  );

  return (
    <>
      <MenuHeader title="Deleted properties" onBack={openPropsMenu} />
      <MenuGroup>
        {deletedProps.map((prop) => (
          <PropertyItem
            key={prop.id}
            property={prop}
            onRestore={() => updateColumn(prop.id, { isDeleted: false })}
            onDelete={() => deleteColumn(prop.id)}
          />
        ))}
      </MenuGroup>
    </>
  );
};

interface PropertyItemProps {
  property: DatabaseProperty;
  onRestore: () => void;
  onDelete: () => void;
}

const PropertyItem: React.FC<PropertyItemProps> = ({
  property,
  onRestore,
  onDelete,
}) => {
  const { name, icon, type } = property;

  return (
    <MenuItem role="menuitem">
      {icon ? <IconBlock icon={icon} /> : <DefaultIcon type={type} />}
      <span className="ml-2 truncate leading-normal">{name}</span>
      <div className="ml-auto flex min-w-0 shrink-0 items-center fill-primary/35 text-muted dark:text-muted-dark">
        <Button
          tabIndex={0}
          aria-label="Restore"
          variant="hint"
          className="size-6 p-0 disabled:opacity-40"
          onClick={(e) => {
            e.stopPropagation();
            onRestore();
          }}
        >
          <Icon.Undo className="size-3.5 fill-primary/45" />
        </Button>
        <Button
          tabIndex={0}
          aria-label="Delete"
          variant="hint"
          className="size-6 p-0 disabled:opacity-40"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Icon.Trash className="size-3.5 fill-primary/45" />
        </Button>
      </div>
    </MenuItem>
  );
};
