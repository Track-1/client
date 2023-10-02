import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isModalOpen } from "../../recoil/common/isModalOpen";
import { isClickedOutside } from "../../utils/common/modal";

export default function useModal() {
  const modalRef = useRef<HTMLDivElement>(null);

  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [openModal]);

  function closeModal(e: MouseEvent) {
    console.log(modalRef.current);
    console.log(e.target);
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
