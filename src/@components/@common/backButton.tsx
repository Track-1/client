import { useContext } from "react";
import styled from "styled-components";
import { BackButtonIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import usePrevPage from "../../hooks/common/usePrevPage";

interface BackButtonProps {
  staticPrevURL?: string | number;
}

export default function BackButton(props: BackButtonProps) {
  const { staticPrevURL } = props;
  const { handleMovePrevPage } = usePrevPage(staticPrevURL);
  const { quitAudioForMovePage } = useContext(PlayerContext);

  return (
    <ButtonContainer
      onClick={() => {
        quitAudioForMovePage();
        handleMovePrevPage();
      }}>
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
