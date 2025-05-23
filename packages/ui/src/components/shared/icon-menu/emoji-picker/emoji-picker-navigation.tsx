"use client";

import React from "react";
import type { EmojiCategoryList } from "@udecode/plate-emoji";
import type { UseEmojiPickerType } from "@udecode/plate-emoji/react";

import { cn } from "@swy/ui/lib";
import { Button } from "@swy/ui/shadcn";

import { Hint, HintProvider } from "../../hint";
import { CirclePlus, emojiCategoryIcons } from "./emoji-icons";

export type EmojiPickerNavigationProps = {
  onClick: (id: EmojiCategoryList) => void;
} & Pick<UseEmojiPickerType, "emojiLibrary" | "focusedCategory" | "i18n">;

export const EmojiPickerNavigation: React.FC<EmojiPickerNavigationProps> = ({
  emojiLibrary,
  focusedCategory,
  i18n,
  onClick,
}) => {
  return (
    <HintProvider delayDuration={500}>
      <nav
        id="emoji-nav"
        className="-mx-3 h-12 border-t bg-transparent px-3 py-2"
      >
        <div className="relative flex items-center justify-between">
          {emojiLibrary
            .getGrid()
            .sections()
            .map(({ id }) => (
              <Hint key={id} align="start" description={i18n.categories[id]}>
                <Button
                  variant="hint"
                  className={cn(
                    "size-8 p-0",
                    id === focusedCategory && "bg-primary/5",
                  )}
                  onClick={() => onClick(id)}
                  aria-label={i18n.categories[id]}
                >
                  <span className="inline-flex size-5 items-center justify-center text-[#91918e] dark:text-primary/45">
                    {emojiCategoryIcons[id]}
                  </span>
                </Button>
              </Hint>
            ))}
          <Hint align="start" description="Add emoji">
            <Button variant="hint" className="size-8 p-0" aria-label="add">
              <span className="inline-flex size-5 items-center justify-center">
                <CirclePlus className="block size-7 flex-shrink-0 scale-110 fill-[#91918e] dark:fill-primary/45" />
              </span>
            </Button>
          </Hint>
        </div>
      </nav>
    </HintProvider>
  );
};
