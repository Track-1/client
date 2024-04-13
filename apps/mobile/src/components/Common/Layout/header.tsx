import styled from 'styled-components';
import { PropsWithChildren, useEffect } from 'react';
// import SideNav from './sideNav';
import { useLocation } from 'react-router-dom';
import { HamburgerMenuIc, HomeLogoIc, Track1LogoIc } from 'src/assets';
import { PADDING_SIDE, Z_INDEX } from 'src/constant/style';

type HeaderStyleType = 'left' | 'mid';

interface HeaderProps {
  headerStyle?: HeaderStyleType;
}

export default function Header(props: PropsWithChildren<HeaderProps>) {
  const { headerStyle, children } = props;
  // const { handleMovePage } = useMovePage();
  const location = useLocation();

  // const { openModal, unShowModal, showModal } = useModal();

  useEffect(() => {
    // unShowModal();
  }, []);

  function handleMoveHome() {
    if (location.pathname.includes('signup')) {
      if (window.confirm('회원가입을 종료하시겠습니까?')) {
        // handleMovePage('home');
      }
    } else {
      // handleMovePage('home');
    }
  }

  return (
    <>
      <Styled.Container>
        {headerStyle === 'mid' ? (
          // <EmptyBox />
          <div></div>
        ) : (
          <Track1LogoIc width={111} height={30} />
        )}
        {children}

        {/* <ImageWrapper width={3} height={3} onClick={showModal}> */}
        <HamburgerMenuIc />
        {/* </ImageWrapper> */}
      </Styled.Container>
      {/* {openModal && <SideNav openModal={openModal} unShowModal={unShowModal} />} */}
    </>
  );
}

const Styled = {
  Container: styled.header`
    position: sticky;
    top: 0;
    left: 0;
    z-index: ${Z_INDEX.HEADER};

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 7rem;

    padding: ${`0 ${PADDING_SIDE}`};

    background-color: ${({ theme }) => theme.colors.black};
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
