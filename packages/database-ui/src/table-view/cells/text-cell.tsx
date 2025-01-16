"use client";

import React from "react";

import "../view.css";

import { useCopyToClipboard } from "usehooks-ts";

import { Hint } from "@swy/ui/shared";

import * as Icon from "../icons";
import { CellTrigger } from "./cell-trigger";
import { TextInputPopover } from "./text-input-popover";
import { useTriggerPosition } from "./use-trigger-position";

interface TextCellProps {
  value: string;
  onChange?: (value: string) => void;
}

export const TextCell: React.FC<TextCellProps> = ({ value, onChange }) => {
  const { ref, position } = useTriggerPosition();
  const [, copy] = useCopyToClipboard();

  return (
    <TextInputPopover value={value} position={position} onChange={onChange}>
      <CellTrigger ref={ref} className="group/text-cell">
        <div className="pointer-events-none absolute left-0 right-0 top-1 z-20 mx-1 my-0 hidden justify-end group-hover/text-cell:flex">
          <div
            key="quickActionContainer"
            className="pointer-events-auto sticky right-1 flex"
          >
            <Hint
              asChild
              description="Copy to Clipboard"
              side="top"
              className="z-[9990]"
            >
              <div
                role="button"
                tabIndex={0}
                aria-label="Copy to Clipboard"
                className="transition-background-in cell-open inline-flex h-6 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md bg-white fill-secondary px-1.5 text-xs/[1.2] font-medium uppercase tracking-[0.5px] text-secondary hover:bg-[#EFEFEE] dark:fill-secondary-dark dark:text-secondary-dark"
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
        <div className="word-break whitespace-pre-wrap leading-[1.5]">
          <span>{value}</span>
        </div>
      </CellTrigger>
    </TextInputPopover>
  );
};
