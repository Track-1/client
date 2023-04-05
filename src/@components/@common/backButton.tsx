import styled from "styled-components";
import { BackBtnIc, BackButtonIc } from "../../assets";
import { useNavigate } from "react-router-dom";

export default function BackButton(props: any) {
  const { pauseAudio } = props;
  // const navigate = useNavigate();

  function movePreviousPage() {
    pauseAudio();
    // navigate(-1);
  }

  return (
    <ButtonContainer onClick={movePreviousPage}>
      <BackButtonIcon />
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

const BackButtonIcon = styled(BackButtonIc)`
  width: 11.4rem;
  cursor: pointer;
`;
