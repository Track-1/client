import { useState, useCallback } from "react";

export default function useInputText(initValue: string, inputLimit: number) {
  const [value, setValue] = useState(initValue);

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    //-1일 경우 입력제한이 없는 Input
    if (e.currentTarget.value.length <= inputLimit || inputLimit === -1) {
      setValue(e.currentTarget.value);
    }
  }, []);
  return [value, changeInput] as const;
}
