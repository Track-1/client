import styled from "styled-components";
import { BackButtonIc } from "../../assets";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  prevURL?: string;
}

export default function BackButton(props: BackButtonProps) {
  // const { pauseAudio } = props;
  const { prevURL } = props;
  const navigate = useNavigate();

  function movePreviousPage() {
    // pauseAudio();
    prevURL && navigate(prevURL);
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

const BackButtonIcon = styled(BackButtonIc)`
  width: 11.4rem;
  cursor: pointer;
`;
