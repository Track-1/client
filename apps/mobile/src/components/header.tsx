import styled from 'styled-components';
import { HamburgerMenuIc, HomeLogoIc, Track1LogoIc } from '../assets';
import { PropsWithChildren, useEffect } from 'react';
import { EmptyBox } from './common/Interface';
import { PADDING_SIDE } from './layout';
import { useMovePage } from '../hooks/common/useMovePage';
import SideNav from './common/Navigation/SideNav';
import useModal from '../hooks/common/useModal';
import { Z_INDEX } from '../core/common/zIndex';

type HeaderStyleType = 'left' | 'mid';

interface HeaderProps {
  headerStyle?: HeaderStyleType;
}

export default function Header(props: PropsWithChildren<HeaderProps>) {
  const { headerStyle, children } = props;
  const { handleMovePage } = useMovePage();

  const { openModal, unShowModal, showModal } = useModal();

  useEffect(() => {
    unShowModal();
  }, []);

  return (
    <>
      <Styled.Container>
        <Track1LogoIc width={111} onClick={() => handleMovePage('home')} />
        {headerStyle === 'mid' && <EmptyBox />}
        {children}
        <HamburgerMenuIc onClick={showModal} />
      </Styled.Container>
      {openModal && <SideNav openModal={openModal} unShowModal={unShowModal} />}
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
