import styled from "styled-components";
import { DeleteIc, EditIc } from "../../assets";
import { deleteTrackComment } from "../../core/api/delete";
import { useMutation, useQueryClient } from "react-query";
import { deleteComment } from "../../core/api/trackPost";

interface PropsType {
  currentId: number;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditDropDownComment(props: PropsType) {
  const { currentId, setIsEdit } = props;

  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteComment(currentId), {
    onSuccess: () => {
      //다시 업로드 하는거 해줘야된다.!
      queryClient.invalidateQueries("comments");
      
      //alert("성공!");
    },
    onError: (error) => {
      console.log("에러!!", error);
    },
  });

  function editComment(){
    setIsEdit(true)
  }

  function deleteTrackComment(){
    console.log("클릭")
    mutate();
  }
  
  return (
    <DropDownContainer>
      <EditWrapper onClick={editComment}>
        <EditText>수정하기</EditText>
        <EditIcon />
      </EditWrapper>
      <DivisionBar />
      <DeleteWrapper onClick={deleteTrackComment}>
        <DeleteText>삭제하기</DeleteText>
        <DeleteIcon />
      </DeleteWrapper>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.ul`
  position: absolute;
  top: 8.2rem;
  right: 0;
  height: 11.2rem;
  width: 20.1rem;
  z-index: 2;
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

const EditIcon=styled(EditIc)`
  width: 2.4rem;
  height: 2.4rem;
`

const DeleteIcon=styled(DeleteIc)`
  width: 2.4rem;
  height: 2.4rem;
`