import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface LayoutProps {}

export const PADDING_SIDE = '2.5rem';

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const { children } = props;

  return <StyledLayout>{children}</StyledLayout>;
}

const StyledLayout = styled.main`
  width: 100%;

  padding: ${`0 ${PADDING_SIDE}`};
`;
