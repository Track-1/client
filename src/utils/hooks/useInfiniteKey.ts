import { useState } from "react";

export default function useInfiniteKey() {
  const [key, setKey] = useState("");
  //const excuteGetData = () => setKey(Math.random().toString(36));

  function excuteGetData() {
    setKey(Math.random().toString(36));
  }

  console.log(key);
  return { key, excuteGetData };
}
