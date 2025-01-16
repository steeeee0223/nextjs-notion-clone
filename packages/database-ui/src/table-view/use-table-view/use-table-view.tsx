/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useMemo, useReducer } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

// import { atom } from "jotai";

import { TableHeaderCell } from "../table-header-cells";
import { TableRowCell } from "../table-row-cells";
import type { PropertyType, RowDataType } from "../types";
import { tableViewReducer, type TableViewAtom } from "./table-reducer";

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

  const addColumn = useCallback(
    (type: PropertyType, name: string) => {
      const hasProp = properties.find((p) => p.name === name);
      dispatch({
        type: "add:col",
        payload: { type, name: hasProp ? `${name} 1` : name },
      });
    },
    [properties],
  );

  return { table, columnSizeVars, addColumn };
};
