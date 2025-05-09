import React, { useLayoutEffect, useRef, useState } from "react";

interface UseInputFieldOptions {
  id: string;
  initialValue: string;
  validate?: (value: string) => boolean;
  onUpdate?: (value: string) => void;
  onKeyDownUpdate?: () => void;
}

interface UseInputFieldResults {
  error: boolean;
  props: Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "id" | "value" | "onError" | "onChange" | "onBlur" | "onKeyDown"
  >;
  ref: React.RefObject<HTMLInputElement>;
}

export const useInputField = ({
  id,
  initialValue,
  validate = (_value) => true,
  onUpdate,
  onKeyDownUpdate,
}: UseInputFieldOptions): UseInputFieldResults => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    ref.current?.focus();
  }, []);

  return {
    error,
    ref,
    props: {
      id,
      value,
      onChange: (e) => {
        e.preventDefault();
        setValue(e.target.value);
        const isValid = validate(e.target.value);
        setError(!isValid);
      },
      onBlur: () => {
        if (error || value === initialValue) return;
        onUpdate?.(value);
      },
      onKeyDown: (e) => {
        if (e.key !== "Enter" || value === initialValue) return;
        if (!error) onUpdate?.(value);
        onKeyDownUpdate?.();
      },
    },
  };
};
