import { useState } from "react";

export default function useFileHover() {
  const [fileHoverState, setFileHoverState] = useState(false);

  function changeFileHoverState(e: React.MouseEvent) {
    setFileHoverState((prev) => !prev);
  }

  return { fileHoverState, changeFileHoverState };
}
