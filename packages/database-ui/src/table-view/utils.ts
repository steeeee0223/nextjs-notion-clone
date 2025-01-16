import { v4 } from "uuid";

import type { CellDataType, PropertyType } from "./types";

export function getDefaultCell(type: PropertyType): CellDataType {
  switch (type) {
    case "checkbox":
      return { type, id: v4(), checked: false };
    case "select":
      return { type, id: v4(), select: null };
    default:
      return { type, id: v4(), value: "" };
  }
}
