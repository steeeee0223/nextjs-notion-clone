"use client";

import React from "react";

import { Hint } from "@swy/ui/shared";

import "../view.css";

import { cn } from "@swy/ui/lib";

import * as Icon from "../icons";
import { CellTrigger } from "./cell-trigger";
import { TextInputPopover } from "./text-input-popover";
import { useTriggerPosition } from "./use-trigger-position";

interface TitleCellProps {
  value: string;
  wrapped?: boolean;
  onChange?: (value: string) => void;
}

export const TitleCell: React.FC<TitleCellProps> = ({
  value,
  wrapped,
  onChange,
}) => {
  const { ref, position, width } = useTriggerPosition();
  return (
    <TextInputPopover value={value} position={position} onChange={onChange}>
      <CellTrigger ref={ref} wrapped={wrapped}>
        <div className="pointer-events-none absolute left-0 right-0 top-1 z-20 mx-1 my-0 hidden justify-end group-hover/row:flex">
          <div
            id="quick-action-container"
            className="pointer-events-auto sticky right-1 flex bg-main dark:bg-popover"
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
                className="cell-open inline-flex h-6 animate-bg-in cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md bg-main fill-secondary px-1.5 text-xs/[1.2] font-medium uppercase tracking-[0.5px] text-secondary hover:bg-primary/5 dark:fill-secondary-dark dark:text-secondary-dark"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <Icon.PeekModeSide
                  className={cn(
                    "block size-[14px] shrink-0 fill-secondary text-secondary dark:fill-secondary-dark dark:text-secondary-dark",
                    width > 110 && "mr-1.5",
                  )}
                />
                {width > 110 && <>Open</>}
              </div>
            </Hint>
          </div>
        </div>
        <span
          className={cn(
            "title-cell-bg-img mr-[5px] inline font-medium leading-[1.5]",
            wrapped
              ? "whitespace-pre-wrap break-words"
              : "whitespace-nowrap break-normal",
          )}
        >
          {value}
        </span>
      </CellTrigger>
    </TextInputPopover>
  );
};
