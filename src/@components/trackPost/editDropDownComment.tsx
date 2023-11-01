import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { DeleteIc, EditIc } from "../../assets";
import useModal from "../../hooks/common/useModal";
import { useDeleteComment } from "../../hooks/queries/comments";

interface EditDropDownCommentProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  commentId: number;
}

export default function EditDropDownComment(props: EditDropDownCommentProps) {
  const { setIsEdit, commentId } = props;
  const { modalRef, closeModal, openModal } = useModal();
  const { deleteComment } = useDeleteComment();
  function handleStartUpdate() {
    setIsEdit(true);
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete the comment?\n댓글을 삭제하시겠습니까?")) {
      deleteComment(commentId);
    }
  }

  return (
    <DropDownContainer ref={modalRef}>
      <DropDownWrapper>
        <EditWrapper onClick={handleStartUpdate}>
          <EditText>수정하기</EditText>
          <EditIcon />
        </EditWrapper>
        <DivisionBar />
        <DeleteWrapper onClick={handleDelete}>
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
