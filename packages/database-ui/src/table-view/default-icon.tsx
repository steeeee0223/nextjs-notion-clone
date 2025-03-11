import React from "react";

import { cn } from "@swy/ui/lib";

import * as Icon from "./icons";
import { PropertyType } from "./types";

interface DefaultIconProps {
  type: PropertyType;
  className?: string;
}

export const DefaultIcon: React.FC<DefaultIconProps> = ({
  type,
  className,
}) => {
  const iconClassName = cn("block size-4 shrink-0", className);
  switch (type) {
    case "title":
      return <Icon.TypesTitle className={iconClassName} />;
    case "text":
      return <Icon.TypesText className={iconClassName} />;
    case "checkbox":
      return <Icon.TypesCheckbox className={iconClassName} />;
    case "select":
    default:
      return <div className={iconClassName} />;
  }
};
