import styled from "styled-components";
import { DeleteIc, EditIc } from "../../../assets";

interface EditModalProps {
  modalRef?: React.RefObject<HTMLDivElement>;
  handleEditFn: (editId: number) => void;
  handleDeleteFn: (deleteId: number) => void;
  id: number;
}

export default function EditModal(props: EditModalProps) {
  const { modalRef, handleEditFn, handleDeleteFn, id } = props;
  return (
    <Styled.DropDownContainer ref={modalRef}>
      <Styled.DropDownWrapper>
        <Styled.MenuWrapper onClick={() => handleEditFn(id)}>
          <strong>수정하기</strong>
          <Styled.EditIcon />
        </Styled.MenuWrapper>
        <Styled.DivisionBar />
        <Styled.MenuWrapper onClick={() => handleDeleteFn(id)}>
          <strong>삭제하기</strong>
          <Styled.DeleteIcon />
        </Styled.MenuWrapper>
      </Styled.DropDownWrapper>
    </Styled.DropDownContainer>
  );
}

const Styled = {
  DropDownContainer: styled.div`
    width: 20.1rem;
    height: 11.2rem;
  `,

  DropDownWrapper: styled.ul`
    width: 100%;
    /* height: 100%; */

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.comment};

    background-color: ${({ theme }) => theme.colors.gray4};

    border-radius: 0.5rem;

    cursor: pointer;
  `,

  MenuWrapper: styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem 2rem;
  `,

  DivisionBar: styled.hr`
    width: 100%;

    border: 0.1rem solid ${({ theme }) => theme.colors.gray3};
  `,

  DeleteWrapper: styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 50%;

    padding: 0 2rem;
  `,

  EditIcon: styled(EditIc)`
    width: 2.4rem;
    height: 2.4rem;
  `,

  DeleteIcon: styled(DeleteIc)`
    width: 2.4rem;
    height: 2.4rem;
  `,
};
