"use client";

import { useLayoutEffect, useRef } from "react";

import { useTransition } from "@swy/ui/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@swy/ui/shadcn";
import { Spinner, useModal } from "@swy/ui/shared";

interface BaseModalProps {
  title: string;
  primary: string;
  secondary: string;
  onTrigger?: () => void | Promise<void>;
}

export const BaseModal = ({
  title,
  primary,
  secondary,
  onTrigger,
}: BaseModalProps) => {
  const { isOpen, setClose } = useModal();
  const [trigger, loading] = useTransition(() => onTrigger?.());

  const reset = async () => {
    await trigger();
    setClose();
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        hideClose
        className="flex w-[300px] flex-col items-start justify-center gap-2 p-6"
        onClick={(e) => e.stopPropagation()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-base font-normal tracking-wide">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="py-1.5">
          <Button
            ref={buttonRef}
            onClick={reset}
            variant="red"
            size="sm"
            className="w-full"
          >
            {primary}
            {loading && <Spinner className="ml-2 text-white" />}
          </Button>
          <Button onClick={setClose} size="sm" className="w-full">
            {secondary}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
