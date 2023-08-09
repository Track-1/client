import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DeleteIc, EditIc } from "../../assets";
import { deleteTrack } from "../../core/api/delete";

export default function EditDropDown() {
  const { beatId } = useParams();
  const navigate = useNavigate();

  const { mutate } = useMutation(deleteTrackAPI, {
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function deleteTrackAPI() {
    return await deleteTrack(beatId);
  }

  function handleDeleteOwnTrack(): void {
    mutate();
  }

  function handleMoveTrackPostEditPage() {
    navigate(`/track-post/edit/${beatId}`);
  }

  return (
    <DropDownContainer>
      <EditWrapper onClick={handleMoveTrackPostEditPage}>
        <EditText>수정하기</EditText>
        <EditIc />
      </EditWrapper>
      <DivisionBar />
      <DeleteWrapper onClick={handleDeleteOwnTrack}>
        <DeleteText>삭제하기</DeleteText>
        <DeleteIc />
      </DeleteWrapper>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.ul`
  height: 11.2rem;
  width: 20.1rem;

  background-color: ${({ theme }) => theme.colors.gray4};

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.comment}

  border-radius: 0.5rem;

  margin-left: 25rem;

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
