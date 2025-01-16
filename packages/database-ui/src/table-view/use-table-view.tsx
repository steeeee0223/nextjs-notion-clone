"use client";

import { useReducer } from "react";
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
      payload: {
        rowId: string;
        property: string;
        data: CellDataType;
      };
    }
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
      header: () => <TableHeaderCell {...property} />,
      cell: ({ row, column }) => {
        const cell = row.original.properties[property.name];
        if (!cell) return null;
        return (
          <TableRowCell
            data={cell}
            rowId={row.index}
            colId={column.getIndex()}
            width={property.width}
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
    getCoreRowModel: getCoreRowModel(),
    // meta: {
    //   updateCell: (payload: Extract<TableViewAction, {type: 'update:cell'}>['payload']) => {
    //     console.log(`updating ${payload.property} with`, payload.data)
    //     dispatch({ type: 'update:cell', payload})
    //   }
    // }
  });

  return { table };
};
