/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useReducer } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

// import { atom } from "jotai";

import { TableHeaderCell } from "./table-header-cells";
import { TableRowCell } from "./table-row-cells";
import type { CellDataType, DatabaseProperty, RowDataType } from "./types";

interface TableViewAtom {
  properties: DatabaseProperty[];
  data: RowDataType[];
}

type TableViewAction =
  | {
      type: "update:cell";
      payload: { rowId: string; property: string; data: CellDataType };
    }
  | { type: "resize"; payload: { id: string; width: string } }
  | { type: "reset" };
const tableViewReducer = (
  v: TableViewAtom,
  a: TableViewAction,
): TableViewAtom => {
  switch (a.type) {
    case "update:cell":
      return {
        ...v,
        data: v.data.map((row) => {
          if (row.id !== a.payload.rowId) return row;
          return {
            ...row,
            properties: {
              ...row.properties,
              [a.payload.property]: a.payload.data,
            },
          };
        }),
      };
    case "resize":
      return {
        ...v,
        properties: v.properties.map((col) => {
          if (col.id !== a.payload.id) return col;
          return { ...col, width: a.payload.width };
        }),
      };
    case "reset":
      return { properties: [], data: [] };
    default:
      return v;
  }
};

export const useTableView = (initial: TableViewAtom) => {
  // const tableViewAtom = useMemo(() => atom(initial), [initial]);
  // const [{ properties, data }, dispatch] = useReducerAtom(
  //   tableViewAtom,
  //   tableViewReducer,
  // );

  const [{ properties, data }, dispatch] = useReducer(
    tableViewReducer,
    initial,
  );

  const columns = properties.map<ColumnDef<RowDataType>>(
    ({ id, ...property }) => ({
      id,
      accessorKey: property.name,
      minSize: property.type === "checkbox" ? 32 : 100,
      header: ({ header }) => (
        <TableHeaderCell
          {...property}
          width={`calc(var(--col-${id}-size) * 1px)`}
          isResizing={header.column.getIsResizing()}
          resizeHandle={{
            onMouseDown: header.getResizeHandler(),
            onMouseUp: () =>
              dispatch({
                type: "resize",
                payload: { id, width: `${header.column.getSize()}px` },
              }),
            onTouchStart: header.getResizeHandler(),
            onTouchEnd: () =>
              dispatch({
                type: "resize",
                payload: { id, width: `${header.column.getSize()}px` },
              }),
          }}
        />
      ),
      cell: ({ row, column }) => {
        const cell = row.original.properties[property.name];
        if (!cell) return null;
        return (
          <TableRowCell
            data={cell}
            rowId={row.index}
            colId={column.getIndex()}
            // width={property.width}
            width={`calc(var(--col-${id}-size) * 1px)`}
            onChange={(data) =>
              dispatch({
                type: "update:cell",
                payload: {
                  rowId: row.original.id,
                  property: property.name,
                  data: { id: cell.id, ...data },
                },
              })
            }
          />
        );
      },
    }),
  );

  const table = useReactTable({
    columns,
    data,
    defaultColumn: {
      size: 200,
      minSize: 100,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    // meta: {
    //   updateCell: (payload: Extract<TableViewAction, {type: 'update:cell'}>['payload']) => {
    //     console.log(`updating ${payload.property} with`, payload.data)
    //     dispatch({ type: 'update:cell', payload})
    //   }
    // }
  });

  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
  const columnSizeVars = useMemo(() => {
    return table.getFlatHeaders().reduce<Record<string, number>>(
      (sizes, header) => ({
        ...sizes,
        [`--header-${header.id}-size`]: header.getSize(),
        [`--col-${header.column.id}-size`]: header.column.getSize(),
      }),
      {},
    );
  }, [
    table.getFlatHeaders(),
    table.getState().columnSizingInfo,
    table.getState().columnSizing,
  ]);

  return { table, columnSizeVars };
};
