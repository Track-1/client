import styled from "styled-components";
import { DeleteIc, EditIc } from "../../assets";
import { deleteTrack } from "../../core/api/delete";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function EditDropDown() {
  const navigate = useNavigate();
  const { beatId } = useParams();

  const { mutate } = useMutation(deleteTrackAPI, {
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      console.log("에러!!", error);
    },
  });

  async function deleteTrackAPI() {
    return await deleteTrack(beatId);
  }

  function deleteOwnTrack(): void {
    mutate();
  }

  function moveTrackPostEditPage() {
    navigate(`/track-post/edit/${beatId}`, { state: beatId });
  }

  return (
    <DropDownContainer>
      <EditWrapper onClick={moveTrackPostEditPage}>
        <EditText>수정하기</EditText>
        <EditIc />
      </EditWrapper>
      <DivisionBar />
      <DeleteWrapper onClick={deleteOwnTrack}>
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
