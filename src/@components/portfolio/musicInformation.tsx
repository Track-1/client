import styled from "styled-components";
import { UserPortfolioType } from "../../type/profile";
import HashTag from "../profile/hashtag";

interface MusicInformationProps {
  vocalPortfolios: UserPortfolioType;
}

export default function MusicInformation(props: MusicInformationProps) {
  const { vocalPortfolios } = props;

  return (
    <MusicInformationWrapper>
      <InformTitle>{vocalPortfolios.portfolioTitle}</InformTitle>
      <InformCategory>{vocalPortfolios.portfolioCategory}</InformCategory>
      <InformContent>{vocalPortfolios.portfolioContent}</InformContent>
      <InformTagWrapper>
        {vocalPortfolios.portfolioKeyword.map((tag: any, idx: any) => (
          <HashTag key={idx} text={tag} />
        ))}
      </InformTagWrapper>
    </MusicInformationWrapper>
  );
}

const MusicInformationWrapper = styled.div`
  width: 38rem;
`;

const InformTitle = styled.h1`
  width: 37.3rem;
  overflow-wrap: break-word;

  margin-top: 1.7rem;
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
`;

const InformCategory = styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};

  margin-top: 0.8rem;
`;

const InformContent = styled.p`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};

  margin-bottom: 2.4rem;
`;

const InformTag = styled.div<{ textLength: number }>`
  display: flex;

  padding: 0 1.5rem;
`;

const InformTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  flex-direction: column;
  margin-top: 2.8rem;
`;
