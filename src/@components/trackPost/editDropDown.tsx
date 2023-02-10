import styled from "styled-components";
import { DeleteIc, EditIc } from "../../assets";

export default function EditDropDown() {
  return (
    <DropDownContainer>
      <EditWrapper>
        <EditText>수정하기</EditText>
        <EditIc />
      </EditWrapper>
      <DivisionBar />
      <DeleteWrapper>
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

  border-radius: 0.5rem;

  margin-left: 25rem;
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
