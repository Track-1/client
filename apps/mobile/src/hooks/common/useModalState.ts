import { useState } from 'react';

export default function useModalState() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  return { isOpen, onClose, onOpen };
}
