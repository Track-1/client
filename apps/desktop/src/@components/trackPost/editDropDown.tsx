import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DeleteIc, EditIc } from "../../assets";
import { useDeleteTrack } from "../../hooks/queries/tracks";
import { TrackDetailType } from "../../type/tracks";
import { useContext } from "react";
import { PlayerContext } from "../../context/playerContext";

interface EditDropDownProps {
  trackDetail: TrackDetailType | undefined;
}

export default function EditDropDown(props: EditDropDownProps) {
  const { trackDetail } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteTrack } = useDeleteTrack();
  const prevURL = useLocation().pathname;
  const { quitAudioForMovePage } = useContext(PlayerContext);

  function handleMoveTrackPostEditPage() {
    quitAudioForMovePage();
    navigate(`/vocal-searching-edit/producer/${id}`, {
      state: {
        prevURL: prevURL,
        uploadEditInitData: trackDetail,
      },
    });
  }

  function handleDeleteTrack() {
    deleteTrack(Number(id));
    navigate("/track-search");
  }

  return (
    <DropDownContainer>
      <EditWrapper onClick={handleMoveTrackPostEditPage}>
        <EditText>수정하기</EditText>
        <EditIc />
      </EditWrapper>
      <DivisionBar />
      <DeleteWrapper onClick={handleDeleteTrack}>
        <DeleteText>삭제하기</DeleteText>
        <DeleteIc />
      </DeleteWrapper>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.ul`
  position: absolute;

  height: 11.2rem;
  width: 20.1rem;

  margin: 6rem 0 0 26rem;

  background-color: ${({ theme }) => theme.colors.gray4};

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.comment}

  border-radius: 0.5rem;

  cursor: pointer;
`;

const EditWrapper = styled.li`
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 2rem;
`;

const EditText = styled.strong``;

const DivisionBar = styled.div`
  height: 0.1rem;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.gray3};
`;

const DeleteWrapper = styled.li`
  height: 50%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 2rem;
`;

const DeleteText = styled.strong``;
