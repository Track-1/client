import styled from "styled-components";
import { PageType } from "../../../type/common/pageType";

interface TrackSearchHeaderNavProps {
  pageType: PageType;
  handleChangeType: (pageType: PageType) => void;
}

export default function TrackSearchHeaderNav(props: TrackSearchHeaderNavProps) {
  const { pageType, handleChangeType } = props;
  return (
    <NavTop>
      <NavItem onClick={() => handleChangeType("tracks")} checkPageType={pageType === "tracks"}>
        Tracks
      </NavItem>
      <NavItem onClick={() => handleChangeType("vocals")} checkPageType={pageType === "vocals"}>
        Vocals
      </NavItem>
    </NavTop>
  );
}

const NavTop = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 27.9rem;
  height: 100%;
`;

const NavItem = styled.button<{ checkPageType: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 12.4rem;
  height: 6.6rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.cations};

  text-decoration: ${(props) => (props.checkPageType ? "underline" : "none")};
`;
