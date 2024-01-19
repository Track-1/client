import { useState } from 'react';

export default function useModalState(initialState: boolean) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  return { isOpen, onClose, onOpen };
}
