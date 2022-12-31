import styled from "styled-components";
import { BackBtnIc } from "../../assets";

export default function BackButton() {
  return (
    <ButtonContainer>
      <BackBtnIc />
      <ButtonText>Back</ButtonText>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  width: 11.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonText = styled.strong`
  ${({ theme }) => theme.fonts.id}

  color: ${({ theme }) => theme.colors.white};
`;
