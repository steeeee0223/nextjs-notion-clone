import React from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Loader, LoaderCircle } from "lucide-react";

import { cn } from "@swy/ui/lib";

const spinnerVariants = cva("animate-spin text-muted dark:text-muted-dark", {
  variants: {
    size: {
      sm: "h-2 w-2",
      md: "h-4 w-4",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  variants?: "solid" | "dashed";
}

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size,
  variants,
}) => {
  const Icon = variants === "dashed" ? Loader : LoaderCircle;
  return (
    <Icon
      className={cn(spinnerVariants({ size, className }))}
      aria-label="spinner"
    />
  );
};
