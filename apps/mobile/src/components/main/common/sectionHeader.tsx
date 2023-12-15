import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface SectionHeaderProps {
  sectionTitle: string;
}

export default function SectionHeader(props: PropsWithChildren<SectionHeaderProps>) {
  const { sectionTitle, children } = props;

  return (
    <Container>
      <SectionTitle>{sectionTitle}</SectionTitle>
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

const SectionTitle = styled.h2`
  ${({ theme }) => theme.fonts.Alex_20_M}
  color: ${({ theme }) => theme.colors.white};
  line-height: normal;

  white-space: pre-line;
`;
