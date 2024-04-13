import { PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PADDING_SIDE } from 'src/constant/style';
import styled from 'styled-components';

export default function Layout(props: PropsWithChildren) {
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
  height: 100%;

  padding: ${`0 ${PADDING_SIDE}`};
`;
