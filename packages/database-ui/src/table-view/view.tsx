"use client";

import React from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

import { paddingX } from "../database/constant";
import { cols, mockData } from "./__mock__";
import * as Icon from "./icons";
import { MenuControlProvider } from "./menus";
import { MemoizedTableBody, TableBody } from "./table-body";
import {
  TableViewProvider,
  useTableActions,
  useTableViewCtx,
} from "./table-contexts";
import { TableHeaderRow } from "./table-header-row";
import type { DatabaseProperty, RowDataType } from "./types";

interface TableViewProps {
  properties?: DatabaseProperty[];
  data?: RowDataType[];
}

export const TableView: React.FC<TableViewProps> = ({
  properties = cols,
  data = mockData,
}) => {
  return (
    <TableViewProvider initialData={{ properties, data }}>
      <MenuControlProvider>
        <TableViewContent />
      </MenuControlProvider>
    </TableViewProvider>
  );
};

const TableViewContent = () => {
  const { table, columnSizeVars, columnSensors } = useTableViewCtx();
  const { reorderColumns } = useTableActions();

  const leftPinnedHeaders = table.getLeftLeafHeaders();
  const headers = table.getCenterLeafHeaders();

  return (
    <div
      key="notion-table-view"
      // No need: pl-[96px] pr-[96px]
      className="relative float-left min-w-full select-none pb-0 lining-nums tabular-nums"
      style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}
    >
      <div className="absolute z-[9990] w-full" />
      <div className="pointer-events-none mt-0 h-0" />
      <div
        data-block-id="15f35e0f-492c-8003-9976-f8ae747a6aeb"
        // key="notion-selectable notion-collection_view-block"
        className="relative"
        style={columnSizeVars}
      >
        {/* Header row */}
        <div className="h-[34px]">
          <div className="w-full" style={{ overflowX: "initial" }}>
            <div className="w-[initial]">
              <div
                data-portal-container="e86cab6b-5fb8-4573-856b-6a12d191ce8c"
                data-is-sticky="false"
                data-sticky-attach-point="ceiling"
              >
                <DndContext
                  collisionDetection={closestCenter}
                  modifiers={[
                    restrictToHorizontalAxis,
                    restrictToParentElement,
                  ]}
                  onDragEnd={reorderColumns}
                  sensors={columnSensors}
                >
                  <div className="relative">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableHeaderRow
                        key={headerGroup.id}
                        leftPinnedHeaders={leftPinnedHeaders}
                        headers={headers}
                        columnOrder={table.getState().columnOrder}
                      />
                    ))}
                  </div>
                </DndContext>
              </div>
            </div>
          </div>
        </div>
        {/* Table body */}
        <div className="relative isolation-auto min-w-[708px]">
          {/* Drag and Fill handle */}
          <div
            key="notion-table-view-drag-and-fill-handle"
            className="relative z-[850] flex"
          >
            <div className="flex w-[calc(100%-64px)]">
              {/* The blue circle */}
              {/* <div className="left-[32px]">
                <div className="absolute left-[210px]">
                  <div className="pointer-events-auto absolute left-0 top-[26px] h-[15px] w-[10px] cursor-ns-resize" />
                  <div className="absolute left-0 top-7 size-[9px] transform cursor-ns-resize rounded-full border-2 border-blue/60 bg-main duration-200" />
                </div>
              </div> */}
            </div>
          </div>
          {/* ??? */}
          <div>
            <div
              data-block-id="15f35e0f-492c-8003-9976-f8ae747a6aeb"
              // key="notion-selectable notion-collection_view-block"
              className="flex w-full"
            />
          </div>
          {/* Rows */}
          {table.getState().columnSizingInfo.isResizingColumn ? (
            <MemoizedTableBody table={table} />
          ) : (
            <TableBody table={table} />
          )}
        </div>
        <div className="w-[438px]" />
        <div
          role="button"
          tabIndex={0}
          key="notion-table-view-add-row"
          className="flex h-[33px] w-full animate-bg-in cursor-pointer select-none items-center bg-main pl-2 leading-5 hover:bg-primary/5"
        >
          <span className="sticky left-10 inline-flex items-center text-sm text-muted opacity-100 transition-opacity duration-200 dark:text-muted-dark">
            <Icon.Plus className="ml-[1px] mr-[7px] block size-[14px] shrink-0 fill-primary/35" />
            New page
          </span>
        </div>
        <div
          // contentEditable="false"
          key="pseudoSelection"
          data-content-editable-void="true"
          className="--pseudoSelection--background: transparent; clip-path: polygon(0% -20%, 100% -20%, 100% 100%, 0% 100%); left-0 z-[850] box-border flex h-[32px] min-w-full select-none border-t border-t-border-cell bg-main text-sm"
        >
          <div className="flex pr-[32px]">
            <div className="flex">
              <div className="left-[calc(32px + -1 * var(--sticky-horizontal-offset, 0px))] sticky z-[830] flex bg-main" />
              <div className="flex w-[216px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="transition: background 0.2s; flex h-8 w-full cursor-pointer select-auto items-center justify-end overflow-hidden whitespace-nowrap pr-2"
                ></div>
              </div>
              <div className="flex w-[100px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="transition: background 0.2s; flex h-8 w-full cursor-pointer select-auto items-center justify-end overflow-hidden whitespace-nowrap pr-2"
                ></div>
              </div>
              <div className="flex w-[90px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="transition: background 0.2s; flex h-8 w-full cursor-pointer select-auto items-center justify-end overflow-hidden whitespace-nowrap pr-2"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none clear-both mt-0 h-0 translate-y-0" />
      <div className="absolute z-[9990] w-full translate-y-[-34px]" />
    </div>
  );
};
