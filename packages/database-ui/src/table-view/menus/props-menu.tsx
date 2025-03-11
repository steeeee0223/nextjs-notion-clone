import { useLayoutEffect, useMemo, useRef } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useFilter } from "@swy/ui/hooks";
import { Button, Input, Separator } from "@swy/ui/shadcn";
import { IconBlock } from "@swy/ui/shared";

import { MenuGroup, MenuGroupHeader, MenuHeader, MenuItem } from "../common";
import { DefaultIcon } from "../default-icon";
import * as Icon from "../icons";
import { useTableActions, useTableViewCtx } from "../table-contexts";
import type { DatabaseProperty } from "../types";
import { DeletedPropsMenu } from "./deleted-props-menu";
import { EditPropMenu } from "./edit-prop-menu";
import { useMenuControl } from "./menu-control-context";
import { TypesMenu } from "./types-menu";

/**
 * @summary The menu of all properties
 */
export const PropsMenu = () => {
  const { table, properties } = useTableViewCtx();
  const { reorderColumns, updateColumn, toggleAllColumns } = useTableActions();
  const { openPopover } = useMenuControl();

  const { columnOrder, columnVisibility } = table.getState();
  const noShownProps = (() => {
    const count = Object.values(columnVisibility).reduce(
      (acc, shown) => {
        const num = Number(shown) as 0 | 1;
        acc[num]++;
        return acc;
      },
      { [1]: 0, [0]: 0 },
    );
    return count[1] === 1;
  })();
  // Search
  const inputRef = useRef<HTMLInputElement>(null);
  const [props, deletedCount] = useMemo(() => {
    const props: DatabaseProperty[] = [];
    let deletedCount = 0;
    columnOrder.forEach((propId) => {
      const prop = properties[propId];
      if (prop && !prop.isDeleted) {
        props.push(prop);
      } else {
        deletedCount++;
      }
    });
    return [props, deletedCount];
  }, [properties, columnOrder]);
  const { search, results, updateSearch } = useFilter(
    props,
    (prop, v) => prop.name.toLowerCase().includes(v),
    { default: "empty" },
  );
  // Menu actions
  const openTypesMenu = () =>
    openPopover(<TypesMenu propId={null} />, { x: -12, y: -12 });
  const openEditPropMenu = (propId: string) =>
    openPopover(<EditPropMenu propId={propId} />, { x: -12, y: -12 });
  const toggleVisibility = (propId: string, hidden: boolean) =>
    updateColumn(propId, { hidden });
  const openDeletedPropsMenu = () =>
    openPopover(<DeletedPropsMenu />, { x: -12, y: -12 });

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <MenuHeader title="Properties" />
      <div className="flex min-w-0 flex-auto flex-col px-3 pb-2 pt-3">
        <Input
          ref={inputRef}
          clear
          className="px-1.5 py-[3px] text-sm"
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          onCancel={() => updateSearch("")}
          placeholder="Search for a property..."
        />
      </div>
      <MenuGroup>
        <MenuGroupHeader
          title={search && !results ? "No results" : "Properties"}
          action={search ? null : noShownProps ? "Show all" : "Hide all"}
          onActionClick={() => toggleAllColumns(!noShownProps)}
        />
        <div className="flex flex-col">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragEnd={reorderColumns}
          >
            <SortableContext
              items={columnOrder}
              strategy={verticalListSortingStrategy}
            >
              {search.length === 0
                ? props.map((prop) => (
                    <PropertyItem
                      key={prop.id}
                      draggable
                      property={prop}
                      onClick={() => openEditPropMenu(prop.id)}
                      onVisibilityChange={(hidden) =>
                        toggleVisibility(prop.id, hidden)
                      }
                    />
                  ))
                : (results ?? []).map((prop) => (
                    <PropertyItem
                      key={prop.id}
                      property={prop}
                      onClick={() => openEditPropMenu(prop.id)}
                      onVisibilityChange={(hidden) =>
                        toggleVisibility(prop.id, hidden)
                      }
                    />
                  ))}
            </SortableContext>
          </DndContext>
        </div>
      </MenuGroup>
      <MenuGroup>
        {deletedCount > 0 && (
          <MenuItem
            variant="secondary"
            tabIndex={0}
            onClick={openDeletedPropsMenu}
          >
            <Icon.Trash className="mr-2 block size-4 shrink-0 fill-primary/45" />
            <div className="mr-1.5 min-w-0 flex-auto truncate">
              Deleted properties
            </div>
            <div className="ml-auto flex min-w-0 shrink-0 items-center fill-primary/35 text-muted dark:text-muted-dark">
              <div className="flex truncate">{deletedCount}</div>
              <Icon.ChevronRight className="transition-out ml-1.5 block h-full w-3 shrink-0 fill-primary/35 dark:fill-primary/30" />
            </div>
          </MenuItem>
        )}
      </MenuGroup>
      <Separator />
      <MenuGroup>
        <MenuItem variant="secondary" onClick={openTypesMenu}>
          <Icon.Plus className="mr-2 block size-4 shrink-0 fill-primary/45" />
          New property
        </MenuItem>
        <MenuItem
          variant="secondary"
          onClick={() =>
            window.open("https://www.notion.com/help/database-properties")
          }
        >
          <Icon.Help className="mr-2 block size-4 shrink-0 fill-primary/45" />
          Learn about properties
        </MenuItem>
      </MenuGroup>
    </>
  );
};

interface PropertyItemProps {
  draggable?: boolean;
  property: DatabaseProperty;
  onClick: () => void;
  onVisibilityChange: (hidden: boolean) => void;
}

const PropertyItem: React.FC<PropertyItemProps> = ({
  draggable,
  property,
  onClick,
  onVisibilityChange,
}) => {
  const { id, name, icon, type, hidden } = property;

  /** DND */
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 10 : 0,
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition, // Warning: it is somehow laggy
  };

  return (
    <MenuItem ref={setNodeRef} role="menuitem" style={style} onClick={onClick}>
      {draggable && (
        <div
          className="mr-2 flex h-6 w-[18px] shrink-0 cursor-grab items-center justify-center"
          {...attributes}
          {...listeners}
        >
          <Icon.DragHandle className="size-3 fill-primary/45" />
        </div>
      )}
      {icon ? <IconBlock icon={icon} /> : <DefaultIcon type={type} />}
      <span className="ml-2 truncate leading-normal">{name}</span>
      <div className="ml-auto flex min-w-0 shrink-0 items-center fill-primary/35 text-muted dark:text-muted-dark">
        <Button
          tabIndex={0}
          aria-label="Toggle property visibility"
          disabled={type === "title"}
          variant="hint"
          className="size-6 p-0 disabled:opacity-40"
          onClick={(e) => {
            e.stopPropagation();
            onVisibilityChange(!hidden);
          }}
        >
          {hidden ? (
            <Icon.EyeHide className="size-4 fill-icon dark:fill-icon-dark" />
          ) : (
            <Icon.Eye className="size-4 fill-icon dark:fill-icon-dark" />
          )}
        </Button>
        <Icon.ChevronRight className="transition-out ml-1.5 block h-full w-3 shrink-0 fill-primary/35 dark:fill-primary/30" />
      </div>
    </MenuItem>
  );
};
