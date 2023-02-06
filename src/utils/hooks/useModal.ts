import { useEffect, useState, useRef } from "react";
import { isClickedOutside } from "../common/modal";

export default function useModal() {
  const modalRef = useRef<HTMLDivElement>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  });

  function closeModal(e: MouseEvent) {
    if (isClickedOutside(e, modalRef, openModal)) {
      setOpenModal(false);
    }
  }

  return { modalRef, closeModal };
}
