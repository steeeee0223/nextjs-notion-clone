"use client";

import React from "react";

import "../view.css";

import { useCopyToClipboard } from "usehooks-ts";

import { cn } from "@swy/ui/lib";
import { Hint } from "@swy/ui/shared";

import * as Icon from "../icons";
import { CellTrigger } from "./cell-trigger";
import { TextInputPopover } from "./text-input-popover";
import { useTriggerPosition } from "./use-trigger-position";

interface TextCellProps {
  value: string;
  wrap?: boolean;
  onChange?: (value: string) => void;
}

export const TextCell: React.FC<TextCellProps> = ({
  value,
  wrap,
  onChange,
}) => {
  const { ref, position } = useTriggerPosition();
  const [, copy] = useCopyToClipboard();

  return (
    <TextInputPopover value={value} position={position} onChange={onChange}>
      <CellTrigger ref={ref} className="group/text-cell" wrapped={wrap}>
        <div className="pointer-events-none absolute left-0 right-0 top-1 z-20 mx-1 my-0 hidden justify-end group-hover/text-cell:flex">
          <div
            id="quick-action-container"
            className="pointer-events-auto sticky right-1 flex bg-main dark:bg-popover"
          >
            <Hint
              description="Copy to Clipboard"
              side="top"
              className="z-[9990]"
            >
              <div
                role="button"
                tabIndex={0}
                aria-label="Copy to Clipboard"
                className="cell-open dark:bg-poopover inline-flex h-6 animate-bg-in cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md bg-main fill-secondary px-1.5 text-xs/[1.2] font-medium uppercase tracking-[0.5px] text-secondary hover:bg-primary/5 dark:fill-secondary-dark dark:text-secondary-dark"
                onClick={(e) => {
                  e.stopPropagation();
                  void copy(value);
                }}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <Icon.Copy className="block size-[14px] shrink-0 fill-secondary text-secondary dark:fill-secondary-dark dark:text-secondary-dark" />
              </div>
            </Hint>
          </div>
        </div>
        <div
          className={cn(
            "whitespace-pre-wrap leading-[1.5]",
            wrap
              ? "whitespace-pre-wrap break-words"
              : "whitespace-nowrap break-normal",
          )}
        >
          <span>{value}</span>
        </div>
      </CellTrigger>
    </TextInputPopover>
  );
};
