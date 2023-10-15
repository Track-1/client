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

  console.log(trackDetail);

  return (
    <>
      {trackDetail?.userSelf && <EditBtnIcon onClick={handleOpenEdit} />}
      {isEditOpen && <EditDropDown trackDetail={trackDetail} />}
    </>
  );
}

const EditBtnIcon = styled(EditBtnIc)`
  margin-left: 18.2rem;

  cursor: pointer;
`;
