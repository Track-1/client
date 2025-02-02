import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface MainNavProps {
  handleMoveTrackSearch: () => void;
  handleMoveVocalSearch: () => void;
}

export default function MainNav(props: MainNavProps) {
  const { handleMoveTrackSearch, handleMoveVocalSearch } = props;
  const navigate = useNavigate();

  function handleMoveEventPage() {
    navigate('/event');
  }

  function handleMoveAboutPage() {
    navigate('/about');
  }

  return (
    <NavMenuContainer>
      {/* <NavMenuWrapper>
        <NavMenu onClick={handleMoveAboutPage}>About</NavMenu>
        <NavMenu onClick={handleMoveEventPage}>Event</NavMenu>
      </NavMenuWrapper> */}
      {/* <DivisionLine /> */}
      <NavMenuWrapper>
        <NavMenu className="nav-track" onClick={handleMoveTrackSearch}>
          Tracks
        </NavMenu>
        <NavMenu className="nav-vocal" onClick={handleMoveVocalSearch}>
          Vocals
        </NavMenu>
      </NavMenuWrapper>
    </NavMenuContainer>
  );
}

const NavMenuContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-left: 10rem;

  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.pretendard_text22};
`;

const NavMenuWrapper = styled.ul`
  display: flex;

  li {
    &:last-child {
      margin: 0;
    }
  }
`;

const NavMenu = styled.li`
  display: flex;
  align-items: center;
  margin-right: 8rem;

  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &.nav-track {
    :hover {
      color: ${({ theme }) => theme.colors.sub1};
    }
  }

  &.nav-vocal {
    :hover {
      color: ${({ theme }) => theme.colors.sub2};
    }
  }
`;

const DivisionLine = styled.hr`
  width: 2.4rem;

  margin: 0 5rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.gray2};

  transform: rotate(90deg);
`;
