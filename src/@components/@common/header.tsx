import { useContext } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HeaderHomeLogoIc, SloganIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import BackButton from "./backButton";

interface HeaderProps {
  backBtn?: boolean;
  prevURL?: string;
  homeLogo?: boolean;
  slogan?: boolean;
  headerFixed?: boolean;
  headerStyle?: React.CSSProperties;

  children?: ReactNode;
}

export default function Header(props: HeaderProps) {
  const { backBtn, homeLogo, prevURL, slogan, headerFixed, headerStyle, children } = props;

  const navigate = useNavigate();
  const { quitAudioForMovePage } = useContext(PlayerContext);

  function handleMoveToHome() {
    quitAudioForMovePage();
    navigate("/");
  }

  return (
    <Container headerFixed={headerFixed} style={headerStyle}>
      <Wrapper>
        {homeLogo && (
          <HeaderHomeLogoIconWrapper>
            <HeaderHomeLogoIcon onClick={handleMoveToHome} />
          </HeaderHomeLogoIconWrapper>
        )}
        {backBtn && <BackButton prevURL={prevURL} />}
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

  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 177rem;
  height: 100%;
`;

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

const SloganIcon = styled(SloganIc)`
  cursor: pointer;

  width: 35rem;
`;
