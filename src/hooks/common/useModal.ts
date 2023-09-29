import { useEffect, useRef, useState } from "react";
import { isClickedOutside } from "../../utils/common/modal";

export default function useModal() {
  const modalRef = useRef<HTMLDivElement>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [openModal]);

  function closeModal(e: MouseEvent) {
    if (isClickedOutside(e, modalRef, openModal)) {
      setOpenModal(false);
    }
  }

  function unShowModal() {
    setOpenModal(false);
  }

  function showModal() {
    setOpenModal(true);
  }

  return { modalRef, closeModal, unShowModal, showModal, openModal };
}
