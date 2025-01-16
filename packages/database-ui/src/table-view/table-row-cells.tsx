"use client";

import React, { useState } from "react";

import "./view.css";

import { CheckboxCell, TextCell, TitleCell } from "./cells";
import { CellType } from "./types";

enum CellMode {
  Normal = "normal",
  Edit = "edit",
  Select = "select",
}

interface TableRowCellProps {
  data: CellType;
  rowId: number;
  colId: number;
  width?: string;
}

export const TableRowCell: React.FC<TableRowCellProps> = ({
  data,
  rowId,
  colId,
  width,
}) => {
  const [mode] = useState<CellMode>(CellMode.Normal);

  return (
    <div
      key="notion-table-view-cell"
      data-row-index={rowId}
      data-col-index={colId}
      className="relative flex h-full border-r border-r-border-cell"
      style={{ width }}
    >
      <div className="flex h-full overflow-x-clip" style={{ width }}>
        <DataCell data={data} />
      </div>
      {mode === CellMode.Select && (
        <div className="shadow-cell pointer-events-none absolute left-0 top-0 z-[840] h-full w-full rounded-[3px] bg-blue/5" />
      )}
    </div>
  );
};

const DataCell: React.FC<{ data: CellType }> = ({ data }) => {
  switch (data.type) {
    case "title":
      return <TitleCell value={data.value} />;
    case "text":
      return <TextCell value={data.value} />;
    case "checkbox":
      return <CheckboxCell checked={data.checked} />;
    default:
      return null;
  }
};
