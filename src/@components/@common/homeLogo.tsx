import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../context/playerContext";
import styled from "styled-components";
import { HeaderHomeLogoIc } from "../../assets";

export default function HomeLogo() {
  const navigate = useNavigate();
  const { quitAudioForMovePage } = useContext(PlayerContext);

  function handleMoveToHome() {
    quitAudioForMovePage();
    navigate("/");
  }

  return (
    <HeaderHomeLogoIconWrapper>
      <HeaderHomeLogoIcon onClick={handleMoveToHome} />
    </HeaderHomeLogoIconWrapper>
  );
}

const HeaderHomeLogoIconWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 22.5rem;
  height: 100%;
`;

const HeaderHomeLogoIcon = styled(HeaderHomeLogoIc)`
  cursor: pointer;

  width: 22.5rem;
`;
