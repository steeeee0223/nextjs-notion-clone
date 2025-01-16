import React from "react";
import { flexRender, type Table } from "@tanstack/react-table";

import { TableRow } from "./table-row";
import type { RowDataType } from "./types";

interface TableBodyProps {
  table: Table<RowDataType>;
}

/**
 * un-memoized normal table body component - see memoized version below
 */
export const TableBody: React.FC<TableBodyProps> = ({ table }) => {
  return table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} blockId={row.id}>
      {row.getVisibleCells().map((cell) => (
        <React.Fragment key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </React.Fragment>
      ))}
    </TableRow>
  ));
};

/**
 * special memoized wrapper for our table body that we will use during column resizing
 */
export const MemoizedTableBody = React.memo<TableBodyProps>(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
);
