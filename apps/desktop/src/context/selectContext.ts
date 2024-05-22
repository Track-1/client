import { createContext } from "react";
import { SelectContextType } from "../type/common/select";

export const SelectContext = createContext<SelectContextType>({
  isSelecBoxOpen: true,
  toggleBoxOpen: () => {},
  selectedId: null,
  selectOption: (id: number | null) => {},
});
