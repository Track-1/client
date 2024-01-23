import { PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface LayoutProps {}

export const PADDING_SIDE = '2.5rem';

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const { children } = props;

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <StyledLayout>{children}</StyledLayout>;
}

export const StyledLayout = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100svh;

  padding: ${`0 ${PADDING_SIDE}`};
`;
