import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HomeLogoIc, SloganIc } from "../../assets";
import BackButton from "./backButton";

interface HeaderProps {
  backBtn?: boolean;
  homeLogo?: boolean;
  slogan?: boolean;
  children?: ReactNode;
}

export default function Header(props: HeaderProps) {
  const { backBtn, homeLogo, slogan, children } = props;

  const navigate = useNavigate();

  function handleMoveToHome() {
    navigate("/");
  }

  return (
    <Container>
      <Wrapper>
        {homeLogo && <HomeLogoIcon onClick={handleMoveToHome} />}
        {backBtn && <BackButton />}
        {slogan && <SloganIcon />}
        {children}
      </Wrapper>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 14.3rem;
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
