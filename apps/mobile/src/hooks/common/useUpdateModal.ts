import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isUpdateModalOpen } from "../../recoil/common/isUpdateModalOpen";
import { isClickedOutside } from "../../utils/common/modal";

export default function useUpdateModal() {
  const modalRef = useRef<HTMLDivElement>(null);

  const [openUpdateModal, setOpenUpdateModal] = useRecoilState<boolean>(isUpdateModalOpen);

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [openUpdateModal]);

  function closeModal(e: MouseEvent) {
    if (isClickedOutside(e, modalRef, openUpdateModal)) {
      setOpenUpdateModal(false);
    }
  }

  function unShowModal() {
    setOpenUpdateModal(false);
  }

  function showModal() {
    setOpenUpdateModal(true);
  }

  return { modalRef, closeModal, unShowModal, showModal, openUpdateModal };
}
