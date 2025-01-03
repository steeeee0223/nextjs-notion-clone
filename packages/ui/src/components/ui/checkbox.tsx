"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

import { cn } from "@swy/ui/lib";

const sizeVariants = cva("", {
  variants: {
    size: {
      md: "size-4",
      sm: "size-[14px]",
      xs: "size-[13px] rounded-[2px]",
    },
  },
  defaultVariants: { size: "md" },
});
const checkboxVariants = cva(
  "peer shrink-0 border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-border-button shadow-sm hover:bg-primary/5 data-[state=checked]:border-none data-[state=checked]:bg-blue data-[state=checked]:text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants>,
    VariantProps<typeof sizeVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      checkboxVariants({ variant }),
      sizeVariants({ size }),
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <Check className={cn(sizeVariants({ size }))} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
