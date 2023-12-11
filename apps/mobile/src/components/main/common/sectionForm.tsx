import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { MoreBtnIc } from '../../../assets';

interface SectionFormProps {
  sectionTitle: string;
}

export function SectionForm(props: PropsWithChildren<SectionFormProps>) {
  const { sectionTitle, children } = props;
  return (
    <Container>
      <SectionHeader>
        <SectionTitle>{sectionTitle}</SectionTitle>
        <MoreBtnIc />
      </SectionHeader>
      <SectionContentWrapper>{children}</SectionContentWrapper>
    </Container>
  );
}

const Container = styled.section`
  margin-top: 7rem;
  padding: 0 2.5rem;
`;

const SectionHeader = styled.div`
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

const SectionContentWrapper = styled.div`
  width: 100%;
`;
