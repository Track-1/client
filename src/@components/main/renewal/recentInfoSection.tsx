import { PropsWithChildren } from "react";
import styled from "styled-components";
import { CommonSectionStyled } from "./eventSection";

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
    margin-left: 36.9rem;
  `,
};
