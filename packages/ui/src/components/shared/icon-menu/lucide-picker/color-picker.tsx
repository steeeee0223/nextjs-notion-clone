"use client";

import React, { forwardRef, useState } from "react";
import { Circle } from "lucide-react";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@swy/ui/shadcn";

import { type PaletteProps } from "../_components";
import { Hint, HintProvider } from "../../hint";

type ColorPickerProps = PaletteProps<
  Record<string, string> & { default: string }
>;

export const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(
  ({ palette, value, onSelect }, ref) => {
    const [open, setOpen] = useState(false);
    const selectColor = (color: string) => {
      setOpen(false);
      onSelect(color);
    };

    return (
      <HintProvider delayDuration={500}>
        <Popover open={open} onOpenChange={setOpen}>
          <Hint description="Select icon color">
            <PopoverTrigger asChild ref={ref}>
              <Button variant="secondary" size="icon-md">
                <Circle size={16} color={value} fill={value} />
              </Button>
            </PopoverTrigger>
          </Hint>
          <PopoverContent className="grid w-[180px] grid-cols-5 gap-0 p-2">
            {Object.entries(palette).map(([name, color]) => (
              <Hint key={name} description={name}>
                <Button
                  variant="hint"
                  className="size-[30px] p-0"
                  onClick={() => selectColor(color)}
                >
                  <Circle color={color} fill={color} size={16} />
                </Button>
              </Hint>
            ))}
          </PopoverContent>
        </Popover>
      </HintProvider>
    );
  },
);

ColorPicker.displayName = "ColorPicker";
