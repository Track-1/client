import styled from "styled-components";
import { DeleteIc, EditIc } from "../../assets";
import { deleteTrackComment } from "../../core/api/delete";
import { useMutation } from "react-query";

interface PropsType {
  currentId: number;
}

export default function EditDropDownComment(props: PropsType) {
  const { currentId } = props;
  const { mutate } = useMutation(() => deleteTrackComment(currentId), {
    onSuccess: () => {
      //다시 업로드 하는거 해줘야된다.!
      alert("성공!");
    },
    onError: (error) => {
      console.log("에러!!", error);
    },
  });

  return (
    <DropDownContainer>
      <EditWrapper>
        <EditText>수정하기</EditText>
        <EditIc />
      </EditWrapper>
      <DivisionBar />
      <DeleteWrapper onClick={() => mutate()}>
        <DeleteText>삭제하기</DeleteText>
        <DeleteIc />
      </DeleteWrapper>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.ul`
  position: absolute;
  top: 6.2rem;
  right: 0;
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
