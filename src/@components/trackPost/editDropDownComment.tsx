import { useQueryClient } from "react-query";
import styled from "styled-components";
import { DeleteIc, EditIc } from "../../assets";
import useModal from "../../hooks/common/useModal";
// import { deleteComment } from "../../core/api/trackPost";

interface EditDropDownCommentProp {
  commentId: number;
}

export default function EditDropDownComment(props: EditDropDownCommentProp) {
  const { commentId } = props;
  const { modalRef, closeModal, openModal } = useModal();

  const queryClient = useQueryClient();

  //   const { mutate:delete } = useMutation(() => deleteComment(currentId), {
  //     onSuccess: () => {
  //       //다시 업로드 하는거 해줘야된다.!
  //       // queryClient.invalidateQueries("comments");
  //       // setIsEnd(!isEnd);
  //       closeModal();
  //       //   setKey((prev: any) => prev + 1);
  //       setIsDeleted(true);
  //     },
  //     onError: (error) => {
  //       console.log("에러!!", error);
  //     },
  //   });

  //   function editComment() {
  //     setIsEdit(true);
  //   }

  //   function deleteTrackComment() {
  //     if (window.confirm("Are you sure you want to delete the comment?\n댓글을 삭제하시겠습니까?")) {
  //       mutate();
  //     }
  //   }

  return (
    <DropDownContainer ref={modalRef}>
      <DropDownWrapper>
        <EditWrapper>
          <EditText>수정하기</EditText>
          <EditIcon />
        </EditWrapper>
        <DivisionBar />
        <DeleteWrapper>
          <DeleteText>삭제하기</DeleteText>
          <DeleteIcon />
        </DeleteWrapper>
      </DropDownWrapper>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.section``;

const DropDownWrapper = styled.ul`
  position: absolute;
  top: 5.8rem;
  right: 0;
  height: 11.2rem;
  width: 20.1rem;
  z-index: 2;
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

const EditIcon = styled(EditIc)`
  width: 2.4rem;
  height: 2.4rem;
`;

const DeleteIcon = styled(DeleteIc)`
  width: 2.4rem;
  height: 2.4rem;
`;
