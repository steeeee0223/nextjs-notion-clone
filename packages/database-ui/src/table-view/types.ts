import type { IconInfo } from "@swy/ui/shared";

export interface Option {
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
  id: string; // row id (page id)
  /**
   * @param key: column id
   * @param value: cell data
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
  icon?: IconInfo | null;
  width?: string;
  description?: string;
  wrapped?: boolean;
  hidden?: boolean;
  isDeleted?: boolean;
}
