import styled from 'styled-components';
import { HamburgerMenuIc, HomeLogoIc } from '../assets';
import { PropsWithChildren } from 'react';
import { EmptyBox } from './common/Interface';
import { PADDING_SIDE } from './layout';

type HeaderStyleType = 'left' | 'mid';

interface HeaderProps {
  headerStyle?: HeaderStyleType;
}

export default function Header(props: PropsWithChildren<HeaderProps>) {
  const { headerStyle, children } = props;

  return (
    <Styled.Container>
      {headerStyle === 'mid' && <EmptyBox />}
      {children}
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
