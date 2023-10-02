import styled from "styled-components";
import { PageType } from "../../../type/common/pageType";
import { useNavigate } from "react-router-dom";

interface TrackSearchHeaderNavProps {
  pageType: PageType;
  changeType: (pageType: PageType) => void;
}

export default function TrackSearchHeaderNav(props: TrackSearchHeaderNavProps) {
  const { pageType, changeType } = props;

  const navigate = useNavigate();

  function handleMoveTrackSearch() {
    changeType("tracks");
    navigate("/track-search");
  }

  function handleMoveVocalSearch() {
    changeType("vocals");
    navigate("/vocal-search");
  }

  return (
    <NavTop>
      <NavItem onClick={handleMoveTrackSearch} checkPageType={pageType === "tracks"}>
        Tracks
      </NavItem>
      <NavItem onClick={handleMoveVocalSearch} checkPageType={pageType === "vocals"}>
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

  /* padding: 2rem; */

  color: ${(props) => (props.checkPageType ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
  ${({ theme }) => theme.fonts.cations};
  text-decoration: ${(props) => (props.checkPageType ? "underline" : "none")};
`;
