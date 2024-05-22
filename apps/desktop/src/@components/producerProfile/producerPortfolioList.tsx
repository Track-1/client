import styled from 'styled-components';
import ProducerPortfolio from '../portfolio/producerPortfolio';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProducerPortfolio } from '../../hooks/queries/mypage';
import { UserPortfolioType } from '../../type/profile';

const PAGE_LIMIT = 5;

export default function ProducerPortfolioList() {
  const { producerId } = useParams();
  const { data: producerPortfolios } = useGetProducerPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });
  const [playingTrack, setPLayingTrack] = useState<UserPortfolioType['portfolioId'] | null>(null);

  function selectTrack(trackId: UserPortfolioType['portfolioId']) {
    setPLayingTrack(trackId);
  }

  if (producerPortfolios === undefined) return null;

  return (
    <PortfolioWrapper>
      {producerPortfolios.map((producerPortfolios, index) => {
        return (
          <ProducerPortfolio
            producerPortfolios={producerPortfolios}
            isFirst={index === 0}
            playingTrack={playingTrack}
            selectTrack={selectTrack}
          />
        );
      })}
    </PortfolioWrapper>
  );
}

const PortfolioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 3rem;
`;
