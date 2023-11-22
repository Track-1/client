import { useState, useCallback } from "react";

export default function useInputText(initValue: string, inputLimit?: number) {
  const [value, setValue] = useState(initValue);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      if (inputLimit) {
        if (inputLimit && e.currentTarget.value.length <= inputLimit) {
          setValue(e.currentTarget.value);
        }
      } else {
        setValue(e.currentTarget.value);
      }
    },
    [],
  );

  function changeInput(value: string) {
    setValue(value);
  }

  return [value, handleChangeInput, changeInput] as const;
}
