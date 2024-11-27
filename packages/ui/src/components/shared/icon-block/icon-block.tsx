"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@swy/ui/lib";
import { Avatar, AvatarFallback, AvatarImage } from "@swy/ui/shadcn";

import { Spinner } from "../spinner";
import { createLucideIcon } from "./create-lucide-icon";
import type { IconInfo } from "./types";
import { getLetter, isEmoji } from "./utils";

const iconBlockVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-5 rounded-sm p-0.5 text-sm/4",
      md: "size-10 rounded-md p-1 text-3xl/8",
      lg: "size-16 rounded-md p-1 text-5xl/tight",
      xl: "size-[78px] rounded-lg p-1 text-7xl",
    },
  },
  defaultVariants: { size: "sm" },
});

export interface IconBlockProps extends VariantProps<typeof iconBlockVariants> {
  className?: string;
  icon: IconInfo;
  fallback?: string;
}

/**
 * A block for icon display.
 */
export const IconBlock: React.FC<IconBlockProps> = ({
  className,
  size,
  ...props
}) => {
  return (
    <Icon {...props} className={cn(iconBlockVariants({ size, className }))} />
  );
};

const Icon: React.FC<Omit<IconBlockProps, "size">> = ({
  className,
  icon,
  fallback = " ",
}) => {
  switch (icon.type) {
    case "lucide": {
      const Icon = createLucideIcon(icon.name);
      return (
        <Icon color={icon.color} className={className} aria-label={icon.name} />
      );
    }
    case "file":
      return (
        <Avatar className={className}>
          <AvatarFallback className="bg-transparent">
            <Spinner className={className} />
          </AvatarFallback>
          <AvatarImage src={icon.url} alt="icon" />
        </Avatar>
      );
    default: {
      if (icon.type === "emoji" && isEmoji(icon.emoji)) {
        return (
          <div
            className={cn(
              "text-center text-primary dark:text-primary/80",
              className,
            )}
          >
            {icon.emoji}
          </div>
        );
      }
      const letter = getLetter(icon, fallback);
      return (
        <div
          className={cn(
            "bg-primary/10 text-center text-secondary dark:text-secondary-dark",
            className,
          )}
        >
          {letter}
        </div>
      );
    }
  }
};
