import { useState } from "react";

export default function usePlayer() {
  const [play, setPlay] = useState<boolean>(false);

  function changeState() {
    setPlay(false);
  }

  return [play, changeState];
}
