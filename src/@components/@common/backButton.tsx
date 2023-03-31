import styled from "styled-components";
import { BackBtnIc } from "../../assets";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  function movePreviousPage() {
    navigate(-1);
  }

  return (
    <ButtonContainer onClick={movePreviousPage}>
      <BackButtonIcon />
      <ButtonText>Back</ButtonText>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const ButtonText = styled.strong`
  ${({ theme }) => theme.fonts.id}

  color: ${({ theme }) => theme.colors.white};
`;

const BackButtonIcon = styled(BackBtnIc)`
  width: 11.4rem;
  cursor: pointer;
`;
