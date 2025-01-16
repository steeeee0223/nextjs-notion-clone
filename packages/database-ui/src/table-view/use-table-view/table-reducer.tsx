import { v4 } from "uuid";

import { DefaultIcon } from "../default-icon";
import type { CellDataType, DatabaseProperty, RowDataType } from "../types";
import { getDefaultCell } from "../utils";

export interface TableViewAtom {
  properties: DatabaseProperty[];
  data: RowDataType[];
}

type TableViewAction =
  | { type: "add:col"; payload: Pick<DatabaseProperty, "type" | "name"> }
  | {
      type: "update:cell";
      payload: { rowId: string; property: string; data: CellDataType };
    }
  | { type: "resize"; payload: { id: string; width: string } }
  | { type: "reset" };
export const tableViewReducer = (
  v: TableViewAtom,
  a: TableViewAction,
): TableViewAtom => {
  switch (a.type) {
    case "add:col": {
      const { type, name } = a.payload;
      return {
        properties: [
          ...v.properties,
          {
            type,
            name,
            id: v4(),
            icon: <DefaultIcon type={type} className="fill-primary/45" />,
          },
        ],
        data: v.data.map(({ id, properties }) => ({
          id,
          properties: { ...properties, [name]: getDefaultCell(type) },
        })),
      };
    }
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
