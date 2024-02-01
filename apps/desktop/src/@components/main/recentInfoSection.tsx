import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { CommonSectionStyled } from './eventSection';

interface RecentTrackSectionProps {
  headingText: string;
  handleMoveToMore: () => void;
}

export default function RecentInfoSection(props: PropsWithChildren<RecentTrackSectionProps>) {
  const { headingText, handleMoveToMore, children } = props;

  return (
    <CommonSectionStyled.SectionContainer>
      <CommonSectionStyled.HeadingWrapper>
        <CommonSectionStyled.HeadingText>{headingText}</CommonSectionStyled.HeadingText>
        <CommonSectionStyled.ShowMoreText onClick={handleMoveToMore}>more</CommonSectionStyled.ShowMoreText>
      </CommonSectionStyled.HeadingWrapper>
      <Styled.ChildrenWrapper>{children}</Styled.ChildrenWrapper>
    </CommonSectionStyled.SectionContainer>
  );
}

const Styled = {
  ChildrenWrapper: styled.div`
    width: 135rem;

    margin-top: -1.8rem;

    padding-left: 36.9rem;

    width: 100%;

    /* padding: 0 10rem; */
  `,

  HeadingTextWrapper: styled.div`
    width: 36.9rem;
    height: 100%;
  `,

  HeadingText: styled.h2`
    width: 36.9rem;
    height: 100%;

    ${({ theme }) => theme.fonts.alexandria_heading38};
    color: ${({ theme }) => theme.colors.white};

    white-space: pre-line;
  `,

  ShowMoreWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: right;

    margin-top: 1.2rem;
    margin-bottom: 5rem;

    ${({ theme }) => theme.fonts.text22};
    color: ${({ theme }) => theme.colors.gray3};

    cursor: pointer;
  `,

  ShowMoreText: styled.p`
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  `,

  TrackSectionWrapper: styled.article`
    width: 100%;
    height: 100%;
  `,
};
