import React from "react";

import { DefaultIcon } from "../default-icon";
import type { PropertyType } from "../types";

interface MenuOption {
  type: PropertyType;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const propertyTypes: Partial<Record<PropertyType, MenuOption>> = {
  title: {
    type: "title",
    title: "Title",
    description: "",
    icon: (
      <DefaultIcon type="title" className="fill-icon dark:fill-icon-dark" />
    ),
  },
  text: {
    type: "text",
    title: "Text",
    description:
      "Add text that can be formatted. Great for summaries, notes, or descriptions.",
    icon: <DefaultIcon type="text" className="fill-icon dark:fill-icon-dark" />,
  },
  checkbox: {
    type: "checkbox",
    title: "Checkbox",
    description:
      "Use a checkbox to indicate whether a condition is true or false. Useful for lightweight task tracking.",
    icon: (
      <DefaultIcon type="checkbox" className="fill-icon dark:fill-icon-dark" />
    ),
  },
} as const;

export const propOptions = Object.values(propertyTypes);
