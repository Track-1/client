import { useState } from "react";
//import { isDefaultImage } from "../uploadPage/uploadImage";

export default function useHover() {
  const [hoverState, setHoverState] = useState<boolean>(false);

  function changeHoverState(argument1: React.MouseEvent, argument2?: string) {
    if (argument2 !== undefined) {
      //!isDefaultImage(argument2) &&
      argument1.type === "mouseenter" ? setHoverState(true) : setHoverState(false);
      return { hoverState, changeHoverState };
    } else {
      argument1.type === "mouseenter" ? setHoverState(true) : setHoverState(false);
      return { hoverState, changeHoverState };
    }
  }

  return { hoverState, changeHoverState };
}
