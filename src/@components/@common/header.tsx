import { useContext } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HomeLogoIc, SloganIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import { RoutesType } from "../../type/common/routes";
import BackButton from "./backButton";

interface HeaderProps {
  backBtn?: boolean;
  prevURL?: RoutesType;
  homeLogo?: boolean;
  slogan?: boolean;
  headerFixed?: boolean;

  children?: ReactNode;
}

export default function Header(props: HeaderProps) {
  const { backBtn, homeLogo, prevURL, slogan, headerFixed, children } = props;

  const navigate = useNavigate();
  const { quitAudioForMovePage } = useContext(PlayerContext);

  function handleMoveToHome() {
    quitAudioForMovePage();
    navigate("/");
  }

  return (
    <Container headerFixed={headerFixed}>
      <Wrapper>
        {homeLogo && <HomeLogoIcon onClick={handleMoveToHome} />}
        {backBtn && <BackButton prevURL={prevURL ?? "-1"} />}
        {slogan && <SloganIcon />}
        {children}
      </Wrapper>
    </Container>
  );
}

const Container = styled.header<{ headerFixed: boolean | undefined }>`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 14.3rem;
  position: ${(props) => (props.headerFixed ? "fixed" : "default")};
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 177rem;
  height: 100%;
`;

const HomeLogoIcon = styled(HomeLogoIc)`
  cursor: pointer;

  width: 26.3rem;
`;

const SloganIcon = styled(SloganIc)`
  cursor: pointer;

  width: 35rem;
`;
