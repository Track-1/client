import styled from "styled-components";
import { BackButtonIc } from "../../assets";
import { useContext } from "react";
import { PlayerContext } from "../../context/playerContext";
import { RoutesType } from "../../type/common/routes";

interface BackButtonProps {
  prevURL: "-1" | RoutesType;
}

export default function BackButton(props: BackButtonProps) {
  const { staticPrevURL } = props;
  const { handleMovePrevPage } = usePrevPage(staticPrevURL);
  const { quitAudioForMovePage } = useContext(PlayerContext);

  function movePreviousPage() {
    quitAudioForMovePage();
    prevURL === "-1" ? navigate(-1) : navigate(prevURL);
  }

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
