import styled from 'styled-components';
import ProducerVocalSearchingPortfolio from './ProducerVocalSearchingPortfolio';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useGetProducerVocalSearching } from '../../hooks/queries/mypage';
import { clickedProfileId } from '../../recoil/common/profile';
import { UserPortfolioType } from '../../type/profile';

const PAGE_LIMIT = 5;

export default function ProducerVocalSearching() {
  const { producerId } = useParams();
  const { data: producerVocalSearchings } = useGetProducerVocalSearching({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });
  const [clickId] = useRecoilState(clickedProfileId);
  const [playingTrack, setPLayingTrack] = useState<UserPortfolioType['portfolioId'] | null>(null);

  function selectTrack(trackId: UserPortfolioType['portfolioId']) {
    setPLayingTrack(trackId);
  }

  function checkFirstTrackPlaying() {
    if (producerVocalSearchings) {
      return clickId === producerVocalSearchings[0].trackId;
    }

    return false;
  }

  if (producerVocalSearchings === undefined) return null;

  return (
    <PortfolioWrapper isFirstPlaying={checkFirstTrackPlaying()}>
      {producerVocalSearchings?.map((producerVocalSearchings) => {
        return (
          <ProducerVocalSearchingPortfolio
            producerVocalSearchings={producerVocalSearchings}
            playingTrack={playingTrack}
            selectTrack={selectTrack}
          />
        );
      })}
    </PortfolioWrapper>
  );
}

const PortfolioWrapper = styled.div<{ isFirstPlaying: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 3rem;
  padding-top: ${({ isFirstPlaying }) => (isFirstPlaying ? 0 : 10)}rem;
  padding-bottom: 10rem;

  color: ${({ theme }) => theme.colors.white};
`;
