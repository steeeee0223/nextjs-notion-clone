"use client";

import React from "react";

import "../view.css";

import { CellTrigger } from "./cell-trigger";
import { TextInputPopover } from "./text-input-popover";
import { useTriggerPosition } from "./use-trigger-position";

interface TextCellProps {
  value: string;
}

export const TextCell: React.FC<TextCellProps> = ({ value }) => {
  const { ref, position } = useTriggerPosition();
  return (
    <TextInputPopover value={value} position={position}>
      <CellTrigger ref={ref}>
        <div className="word-break whitespace-pre-wrap leading-[1.5]">
          <span>{value}</span>
        </div>
      </CellTrigger>
    </TextInputPopover>
  );
};
