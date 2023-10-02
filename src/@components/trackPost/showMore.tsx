import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { EditBtnIc } from "../../assets";
import { useTrackDetail } from "../../hooks/queries/tracks";
import EditDropDown from "./editDropDown";

export default function ShowMore() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleOpenEdit() {
    isEditOpen ? setIsEditOpen(false) : setIsEditOpen(true);
  }

  return (
    <>
      {trackDetail?.userSelf && <EditBtnIcon onClick={handleOpenEdit} />}
      {isEditOpen && <EditDropDown />}
    </>
  );
}

const EditBtnIcon = styled(EditBtnIc)`
  margin-left: 18.2rem;

  cursor: pointer;
`;
