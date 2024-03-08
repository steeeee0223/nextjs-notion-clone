"use client";

import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { toast } from "sonner";

import {
  Button,
  CRUDItemIcon as Icon,
  Input,
  Skeleton,
  useTreeAction,
  type TreeItem,
} from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";

import { updateDocument } from "~/actions";
import { theme } from "~/constants/theme";

interface TitleProps {
  initialData: TreeItem;
}

const Title = ({ initialData }: TitleProps) => {
  const [title, setTitle] = useState(initialData.title ?? "Untitled");
  /** Input */
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };
  const disableInput = () => setIsEditing(false);
  /** Action - Rename */
  const { dispatch } = useTreeAction();
  const { execute: update } = useAction(updateDocument, {
    onSuccess: (data) => {
      dispatch({
        type: "update:item",
        payload: { ...data, group: "document" },
      });
      toast.success(`Renamed document "${data.title}"`);
    },
  });
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
      if (title !== initialData.title)
        update({ id: initialData.id, title, log: true })
          .then(() => console.log(`processing update`))
          .catch(() => console.log(`error`));
    }
  };

  return (
    <div className={theme.flex.gap1}>
      <Icon icon={initialData.icon} />
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="ml-1 h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="ml-1 h-auto p-1 font-normal"
        >
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};

export default Title;