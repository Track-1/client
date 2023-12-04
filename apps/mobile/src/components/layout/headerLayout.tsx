import { PropsWithChildren } from 'react';
import Header from '../header';
import styled from 'styled-components';

export default function HeaderLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <FixedSlot>
        <Header />
      </FixedSlot>
      <main>{children}</main>
    </>
  );
}

const FixedSlot = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
`;
