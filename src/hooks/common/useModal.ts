import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isModalOpen } from "../../recoil/common/isModalOpen";

export default function useModal() {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(isModalOpen);

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [isOpenModal]);

  function closeModal() {
    setIsOpenModal(false);
  }

  function openModal() {
    setIsOpenModal(true);
  }

  return { modalRef, closeModal, openModal };
}
