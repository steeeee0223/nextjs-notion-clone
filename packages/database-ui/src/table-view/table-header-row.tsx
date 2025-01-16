/* eslint-disable jsx-a11y/label-has-associated-control */
import "./view.css";

import React from "react";

import * as Icon from "./icons";
import { PropertiesMenu } from "./menus";
import { ActionCell } from "./table-header-cells";
import type { PropertyType } from "./types";

interface TableHeaderRowProps extends React.PropsWithChildren {
  onSelectProp?: (type: PropertyType, name: string) => void;
}

export const TableHeaderRow: React.FC<TableHeaderRowProps> = ({
  children,
  onSelectProp,
}) => {
  return (
    <div
      // key="notion-table-view-header-row"
      dir="ltr"
      className="box-shadow: white -3px 0px 0px, rgb(233, 233, 231) 0px -1px 0px inset; relative left-0 right-0 z-[870] box-border flex h-[34px] min-w-[708px] bg-white text-primary/65"
    >
      <div className="left: calc(32px + -1 * var(--sticky-horizontal-offset, 0px)); sticky z-[830] flex">
        <div className="absolute -left-8">
          <div className="h-full border-b-[#E9E9E7] opacity-0">
            <div className="h-full">
              <label className="z-10 flex h-full cursor-pointer items-start justify-center opacity-0">
                <div className="flex h-[31px] w-8 items-center justify-center">
                  <input
                    type="checkbox"
                    className="relative right-0.5 size-[14px] cursor-pointer accent-blue"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="m-0 inline-flex">{children}</div>
      <PropertiesMenu onSelectProp={onSelectProp} />
      <ActionCell
        icon={
          <Icon.Dots className="block h-full w-3 shrink-0 fill-primary/45" />
        }
        className="grow"
      />
    </div>
  );
};
