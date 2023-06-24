import { useState, useCallback } from "react";

export default function useInputText(initValue: string, inputLimit?: number) {
  const [value, setValue] = useState(initValue);

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (inputLimit && e.currentTarget.value.length <= inputLimit) {
      setValue(e.currentTarget.value);
    }
  }, []);
  return [value, changeInput] as const;
}
