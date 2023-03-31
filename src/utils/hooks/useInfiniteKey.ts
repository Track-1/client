import { useState } from "react";

export default function useInfiniteKey() {
  const [key, setKey] = useState(Math.random().toString(36));

  function excuteGetData() {
    setKey(Math.random().toString(36));
  }

  return { key, excuteGetData };
}
