"use client";

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { TableHeaderCell } from "./table-header-cells";
import { TableRowCell } from "./table-row-cells";
import type { DatabaseProperty, RowDataType } from "./types";

interface UseTableViewParams {
  properties: DatabaseProperty[];
  data: RowDataType[];
}

export const useTableView = ({ properties, data }: UseTableViewParams) => {
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
          />
        );
      },
    }),
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table };
};
