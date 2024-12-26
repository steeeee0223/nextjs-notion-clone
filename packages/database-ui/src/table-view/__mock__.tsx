import * as Icon from "./icons";
import type { DatabaseProperty, RowDataType } from "./types";

export const cols: DatabaseProperty[] = [
  {
    id: "prop-1",
    type: "title",
    name: "Name",
    icon: <Icon.TypesTitle className="block size-4 shrink-0 fill-primary/45" />,
    width: "216px",
  },
  {
    id: "prop-2",
    type: "text",
    name: "Desc.",
    icon: <Icon.TypesText className="block size-4 shrink-0 fill-primary/45" />,
    width: "100px",
  },
  {
    id: "prop-3",
    type: "checkbox",
    name: "Done",
    icon: (
      <Icon.TypesCheckbox className="block size-4 shrink-0 fill-primary/45" />
    ),
    width: "90px",
  },
];

export const mockData: RowDataType[] = [
  {
    id: "15f35e0f-492c-804c-9534-d615e3925074",
    properties: {
      Name: {
        id: "prop-1",
        type: "title",
        value: "page 1",
      },
      "Desc.": {
        id: "prop-2",
        type: "text",
        value: "desc1",
      },
      Done: {
        id: "prop-3",
        type: "checkbox",
        checked: true,
      },
    },
  },
  {
    id: "15f35e0f-492c-809e-b647-f72038f14c5f",
    properties: {
      Name: {
        id: "prop-1",
        type: "title",
        value: "page 2",
      },
      "Desc.": {
        id: "prop-2",
        type: "text",
        value: "desc2",
      },
      Done: {
        id: "prop-3",
        type: "checkbox",
        checked: false,
      },
    },
  },
];
