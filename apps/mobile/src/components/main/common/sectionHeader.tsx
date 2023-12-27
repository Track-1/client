import { PropsWithChildren } from 'react';
import styled from 'styled-components';


export default function SectionHeader(props: PropsWithChildren) {
  const {  children } = props;

  return (
    <Container>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;

  width: 100%;

  margin-bottom: 3rem;
`;
