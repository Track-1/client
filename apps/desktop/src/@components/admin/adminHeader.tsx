import styled, { CSSProperties } from 'styled-components';
import Header from '../@common/header';
import { MainLogoWhiteIc } from '../../assets';
import LoginBtn from '../main/loginBtn';
import { theme } from '../../style/theme';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();

  function handleMoveHome() {
    navigate('/');
  }

  function handleMoveEvent() {
    navigate('/admin/event');
  }

  return (
    <Header headerStyle={headerStyle}>
      <Styled.HeaderWrapper>
        <Styled.MainLogoWhiteIcon onClick={handleMoveHome} />
        <Styled.NavMenuContainer>
          <Styled.NavMenuWrapper>
            <Styled.NavMenu>About</Styled.NavMenu>
            <Styled.NavMenu onClick={handleMoveEvent}>Event</Styled.NavMenu>
          </Styled.NavMenuWrapper>

          <Styled.DivisionLine />
        </Styled.NavMenuContainer>
      </Styled.HeaderWrapper>
      <LoginBtn />
    </Header>
  );
}

const headerStyle: CSSProperties = {
  position: 'sticky',
  zIndex: '5',
  background: `${theme.colors.black}`,
};

const Styled = {
  HeaderWrapper: styled.div`
    display: flex;
  `,
  MainLogoWhiteIcon: styled(MainLogoWhiteIc)`
    width: 18.3rem;

    cursor: pointer;
  `,

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
