import { createContext } from "react";
import { SwitchContextType } from "../type/common/switch";

export const SwitchContext = createContext<SwitchContextType>({
  currentThumb: "off",
  switchThumb: () => {},
});
