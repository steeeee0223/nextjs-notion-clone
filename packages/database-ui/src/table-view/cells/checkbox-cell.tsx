"use client";

import React from "react";

import "../view.css";

import { cn } from "@swy/ui/lib";

import * as Icon from "../icons";
import { CellTrigger } from "./cell-trigger";

interface CheckboxCellProps {
  checked: boolean;
}

export const CheckboxCell: React.FC<CheckboxCellProps> = ({ checked }) => {
  return (
    <CellTrigger className="py-2">
      <div className="max-w-full">
        <div
          key="pseudoHover pseudoActive"
          className={cn(
            "transition-background-out --pseudoHover--background: rgba(55,53,47,.06); --pseudoActive--background: rgba(55,53,47,.16); relative flex size-4 shrink-0 grow-0 items-center justify-center rounded-[3px]",
            checked && "bg-blue",
          )}
        >
          <div aria-hidden="true">
            {checked ? (
              <Icon.RoundedCheck className="block size-3.5 shrink-0 fill-white" />
            ) : (
              <Icon.RoundedSquareCheckbox className="block size-full shrink-0 fill-none stroke-[#C4C4C4]" />
            )}
          </div>
          <input
            checked={checked}
            type="checkbox"
            className="absolute left-0 top-0 size-4 cursor-pointer opacity-0"
          />
        </div>
      </div>
    </CellTrigger>
  );
};
