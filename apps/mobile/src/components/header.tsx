import styled from "styled-components";
import { HamburgerMenuIc, HomeLogoIc } from "../assets";

export default function Header() {
  return (
    <Styled.Container>
      <HomeLogoIc />
      <HamburgerMenuIc />
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 7rem;

    padding: 0 2.5rem;
  `,

  HomeLogoIcon: styled(HomeLogoIc)`
    width: 11.1rem;

    cursor: pointer;
  `,

  HamburgerMenuIcon: styled(HamburgerMenuIc)`
    width: 1.6rem;

    cursor: pointer;
  `,
};
