"use client";

import React from "react";

import { Hint } from "@swy/ui/shared";

import "../view.css";

import * as Icon from "../icons";
import { CellTrigger } from "./cell-trigger";
import { TextInputPopover } from "./text-input-popover";
import { useTriggerPosition } from "./use-trigger-position";

interface TitleCellProps {
  value: string;
  onChange?: (value: string) => void;
}

export const TitleCell: React.FC<TitleCellProps> = ({ value, onChange }) => {
  const { ref, position } = useTriggerPosition();
  return (
    <TextInputPopover value={value} position={position} onChange={onChange}>
      <CellTrigger ref={ref}>
        <div className="pointer-events-none absolute left-0 right-0 top-1 z-20 mx-1 my-0 hidden justify-end group-hover/row:flex">
          <div
            key="quickActionContainer"
            className="pointer-events-auto sticky right-1 flex"
          >
            <Hint
              description="Open in side peek"
              side="top"
              className="z-[9990]"
            >
              <div
                role="button"
                tabIndex={0}
                aria-label="Open in side peek"
                className="transition-background-in cell-open inline-flex h-6 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md bg-white fill-secondary px-1.5 text-xs/[1.2] font-medium uppercase tracking-[0.5px] text-secondary hover:bg-[#EFEFEE] dark:fill-secondary-dark dark:text-secondary-dark"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <Icon.PeekModeSide className="mr-1.5 block size-[14px] shrink-0 fill-secondary text-secondary dark:fill-secondary-dark dark:text-secondary-dark" />
                Open
              </div>
            </Hint>
          </div>
        </div>
        <span className="word-break title-cell-bg-img mr-[5px] inline whitespace-pre-wrap font-medium leading-[1.5]">
          {value}
        </span>
      </CellTrigger>
    </TextInputPopover>
  );
};
