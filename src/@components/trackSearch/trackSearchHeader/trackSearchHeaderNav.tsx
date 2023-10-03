import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { trackSearchPageType } from "../../../recoil/common/trackSearchPageType";


export default function TrackSearchHeaderNav() {
  const [pageType, setPageType] = useRecoilState(trackSearchPageType);


  const navigate = useNavigate();

  function handleMoveTrackSearch() {
    setPageType("tracks");
    navigate("/track-search");
  }

  function handleMoveVocalSearch() {
    setPageType("vocals");
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

  color: ${(props) => (props.checkPageType ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
  ${({ theme }) => theme.fonts.cations};

  text-decoration: ${(props) => (props.checkPageType ? "underline" : "none")};
  text-underline-position: under;
`;
