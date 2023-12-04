import { PropsWithChildren } from 'react';
import Header from '../header';
import styled from 'styled-components';
import Footer from '../footer';

export default function HeaderFooterLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <FixedSlot>
        <Header />
      </FixedSlot>
      <main>{children}</main>
      <Footer />
    </>
  );
}

const FixedSlot = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;
