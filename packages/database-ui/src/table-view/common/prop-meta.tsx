"use client";

import { useLayoutEffect, useState } from "react";

import { Input } from "@swy/ui/shadcn";
import { Hint, IconBlock, IconMenu } from "@swy/ui/shared";

import { DefaultIcon } from "../default-icon";
import { useInputField } from "../hooks";
import * as Icon from "../icons";
import { UpdateColumnPayload } from "../table-contexts";
import { DatabaseProperty } from "../types";

interface PropMetaProps {
  property: Pick<DatabaseProperty, "type" | "name" | "icon" | "description">;
  validateName: (value: string) => boolean;
  onUpdate: (data: Omit<UpdateColumnPayload, "width">) => void;
  onKeyDownUpdate: () => void;
}

export const PropMeta: React.FC<PropMetaProps> = ({
  property,
  validateName,
  onUpdate,
  onKeyDownUpdate,
}) => {
  const [showDesc, setShowDesc] = useState(false);
  const toggleDesc = () => setShowDesc((prev) => !prev);

  const nameField = useInputField({
    id: "name",
    initialValue: property.name,
    validate: validateName,
    onUpdate: (name) => onUpdate({ name }),
    onKeyDownUpdate,
  });
  const descField = useInputField({
    id: "description",
    initialValue: property.description ?? "",
    onUpdate: (description) => onUpdate({ description }),
    onKeyDownUpdate,
  });
  /** Icon */
  const uploadIcon = (file: File) => {
    // TODO impl. this
    onUpdate({ icon: { type: "file", url: URL.createObjectURL(file) } });
  };

  useLayoutEffect(() => {
    if (showDesc) descField.ref.current?.focus();
  }, [descField.ref, showDesc]);

  return (
    <>
      <div className="flex flex-col gap-px pb-1 pt-3">
        <div className="flex min-h-7 w-full select-none items-center">
          <div className="ml-3 mr-auto min-w-0 shrink-0">
            <IconMenu
              className="box-border size-7 animate-bg-in rounded-md border border-border"
              onSelect={(icon) => onUpdate({ icon })}
              onRemove={() => onUpdate({ icon: null })}
              onUpload={uploadIcon}
            >
              {property.icon ? (
                <IconBlock icon={property.icon} className="size-3.5 p-0" />
              ) : (
                <DefaultIcon type={property.type} />
              )}
            </IconMenu>
          </div>
          <div className="ml-1.5 mr-3 min-w-0 flex-auto">
            <div className="flex">
              <Input
                ref={nameField.ref}
                {...nameField.props}
                endIcon={
                  <Hint side="top" description="Add property description">
                    <div
                      role="button"
                      tabIndex={0}
                      className="ml-1 shrink-0 grow-0 animate-bg-in cursor-pointer select-none rounded-[20px] hover:bg-primary/5"
                      onClick={toggleDesc}
                      onKeyDown={toggleDesc}
                    >
                      <Icon.InfoFilled className="block size-4 shrink-0 fill-primary/45 hover:fill-primary/85 dark:hover:fill-primary/80" />
                    </div>
                  </Hint>
                }
              />
            </div>
          </div>
        </div>
        {nameField.error && (
          <div className="mx-4 pt-2 text-sm text-red">
            A property named Select already exists in this database.
          </div>
        )}
      </div>
      {showDesc && (
        <div className="flex min-h-7 w-full min-w-0 flex-auto select-none items-center px-3 py-1 leading-[1.2]">
          <Input
            ref={descField.ref}
            className="h-auto text-[13px]/[20px]"
            placeholder="Add a description..."
            {...descField.props}
          />
        </div>
      )}
    </>
  );
};
