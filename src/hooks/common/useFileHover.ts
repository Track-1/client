import { useState } from "react";

export default function useFileHover(previewImage: string | ArrayBuffer | null) {
  const [fileHoverState, setFileHoverState] = useState(false);

  function changeFileHoverState(e: React.MouseEvent) {
    previewImage && e.type === "mouseenter" ? setFileHoverState(true) : setFileHoverState(false);
    return { fileHoverState, changeFileHoverState };
  }

  return { fileHoverState, changeFileHoverState };
}
