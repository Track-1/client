import styled from 'styled-components';
import EditDropDown from './editDropDown';
import { useState } from 'react';
import { EditBtnIc } from '../../assets';
import { useTrackDetail } from '../../hooks/queries/tracks';

export default function ShowMore() {
  const { trackDetail } = useTrackDetail();
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleOpenEdit() {
    isEditOpen ? setIsEditOpen(false) : setIsEditOpen(true);
  }

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
