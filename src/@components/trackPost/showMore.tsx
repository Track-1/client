import { useState } from "react";
import styled from "styled-components";
import { EditBtnIc } from "../../assets";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";
import EditDropDown from "./editDropDown";

export default function ShowMore() {
  const { userSelf } = useGetTrackInfo();
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleOpenEdit() {
    isEditOpen ? setIsEditOpen(false) : setIsEditOpen(true);
  }

  return (
    <>
      {userSelf && <EditBtnIcon onClick={handleOpenEdit} />}
      {isEditOpen && <EditDropDown />}
    </>
  );
}

const EditBtnIcon = styled(EditBtnIc)`
  margin-left: 18.2rem;

  cursor: pointer;
`;
