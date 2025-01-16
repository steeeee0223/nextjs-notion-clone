import React from "react";

interface Option {
  id: string;
  name: string;
  color: string;
}

export type CellType =
  | { type: "title" | "text"; value: string }
  | { type: "checkbox"; checked: boolean }
  | { type: "select"; select: Option | null };
export type PropertyType = CellType["type"];

export type CellDataType = {
  id: string; // cell id
} & CellType;

export interface RowDataType {
  id: string; // page id
  /**
   * key: name of column
   * value: cell data
   */
  properties: Record<string, CellDataType>;
}

export type HeaderCellType =
  | { type: "title" | "text" | "checkbox" }
  | { type: "select"; options: Option[] };

export interface DatabaseProperty {
  id: string;
  type: PropertyType;
  name: string;
  icon: React.ReactNode;
  width?: string;
  description?: string;
}
