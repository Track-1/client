import { useState } from "react";

export const useSelect = <T>(defaultOpen?: boolean) => {
  const [selectedOption, setSelectedOption] = useState<T | null>(null);
  const [multiSelectedOption, setMultiSelectedOption] = useState<T[]>([]);
  const [isSelecBoxOpen, setIsSelecBoxOpen] = useState(defaultOpen ?? false);

  const toggleBoxOpen = () => {
    setIsSelecBoxOpen((prevIsOpen) => !prevIsOpen);
  };

  const selectOption = (option: T) => {
    setSelectedOption(option);
  };

  const selectMultOption = (option: T) => {
    setMultiSelectedOption((prev) => [...prev, option]);
  };

  return { selectedOption, multiSelectedOption, selectOption, selectMultOption, isSelecBoxOpen, toggleBoxOpen };
};
