import { useEffect, useRef } from "react";

interface useModalsProps{
    isOpen:boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useModals({isOpen:openModal, setIsOpen:setOpenModal}:useModalsProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [openModal]);

   function isClickedOutside(e: MouseEvent, openModal: boolean) {
    return openModal && !modalRef.current?.contains(e.target as Node);
  }

  function closeModal(e: MouseEvent) {
    if (isClickedOutside(e, openModal)) {
        unShowModal()
    }
  }

  function unShowModal() {
    setOpenModal(false);
  }

  function showModal() {
    setOpenModal(true);
  }

  function handleShowUpdateModal() {
    !openModal ? showModal() : unShowModal();
  }

  return { modalRef, closeModal, unShowModal, showModal, openModal, handleShowUpdateModal };
}
