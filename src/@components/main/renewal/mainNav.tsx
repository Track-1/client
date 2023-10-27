import styled from "styled-components";

interface MainNavProps {
  handleMoveTrackSearch: () => void;
  handleMoveVocalSearch: () => void;
}

export default function MainNav(props: MainNavProps) {
  const { handleMoveTrackSearch, handleMoveVocalSearch } = props;
  return (
    <Styled.NavMenuContainer>
      <Styled.NavMenuWrapper>
        <Styled.NavMenu>About</Styled.NavMenu>
        <Styled.NavMenu>Event</Styled.NavMenu>
      </Styled.NavMenuWrapper>

      <Styled.DivisionLine />

      <Styled.NavMenuWrapper>
        <Styled.NavMenu className="nav-track" onClick={handleMoveTrackSearch}>
          Tracks
        </Styled.NavMenu>
        <Styled.NavMenu className="nav-vocal" onClick={handleMoveVocalSearch}>
          Vocals
        </Styled.NavMenu>
      </Styled.NavMenuWrapper>
    </Styled.NavMenuContainer>
  );
}

const Styled = {
  NavMenuContainer: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-left: 10rem;

    color: ${({ theme }) => theme.colors.gray2};
    ${({ theme }) => theme.fonts.pretendard_text22};
  `,

  NavMenuWrapper: styled.ul`
    display: flex;

    li {
      &:last-child {
        margin: 0;
      }
    }
  `,

  NavMenu: styled.li`
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
  `,

  DivisionLine: styled.hr`
    width: 2.4rem;

    margin: 0 5rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.gray2};

    transform: rotate(90deg);
  `,
};
