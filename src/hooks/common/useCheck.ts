import { useState } from "react";

export function useCheck<T>() {
  const [checkedOptions, setCheckedOptions] = useState<Set<T>>(new Set());

  function check(option: T) {
    console.log(Array.from(checkedOptions));
    const tempCheckedSet = checkedOptions;

    if (tempCheckedSet.has(option)) {
      tempCheckedSet.delete(option);
    } else {
      tempCheckedSet.add(option);
    }

    setCheckedOptions(tempCheckedSet);
  }

  return { checkedOptions: Array.from(checkedOptions), check };
}
