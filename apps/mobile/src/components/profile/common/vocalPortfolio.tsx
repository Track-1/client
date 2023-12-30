import styled from 'styled-components';
import { PADDING_SIDE } from '../../layout';
import Text from '../../common/Text';
import PortfolioForm from './portfolioForm';
import PlayCoverForm from '../../common/Form/playCoverForm';
import { UserPortfolioType } from '../../../type/profile';
import { useState } from 'react';

interface VocalPortfolioProps {
  vocalPortfolios: UserPortfolioType[] | undefined;
  userName?: string;
}

export default function VocalPortfolio(props: VocalPortfolioProps) {
  const { vocalPortfolios, userName } = props;

  const [playingTrack, setPLayingTrack] = useState<UserPortfolioType['portfolioId'] | null>(null);

  function selectTrack(userId: UserPortfolioType['portfolioId']) {
    setPLayingTrack(userId);
  }

  return (
    <>
      <MenuWrapper>
        <Text as="li" font="Alex_14_R" color="white">
          Portfolio
        </Text>
      </MenuWrapper>
      <PortfolioList>
        {vocalPortfolios?.map((portfolio) => (
          <PortfolioForm
            pageType="vocals"
            category={portfolio.portfolioCategory}
            title={portfolio.portfolioTitle}
            hashTagList={portfolio.portfolioKeyword}
            introduce={portfolio.portfolioContent}>
            <PlayCoverForm
              imageFile={portfolio.portfolioImageFile}
              audioFile={portfolio.portfolioAudioFile}
              audioId={portfolio.portfolioId}
              audioTitle={portfolio.portfolioTitle}
              userName={userName || ''}
              playingTrack={playingTrack}
              selectTrack={selectTrack}
              width={12}
              height={12}
              shape="rectangle"
              align="rightBottom"
            />
          </PortfolioForm>
        ))}
      </PortfolioList>
    </>
  );
}

const MenuWrapper = styled.ul`
  display: flex;
  align-items: center;

  width: calc(${`100% + ${PADDING_SIDE}*2`});
  height: 4.8rem;

  padding: ${`0 ${PADDING_SIDE}`};
  margin-left: ${`-${PADDING_SIDE}`};

  background-color: ${({ theme }) => theme.colors.gray6};
`;

const PortfolioList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  margin-top: 3rem;
`;
