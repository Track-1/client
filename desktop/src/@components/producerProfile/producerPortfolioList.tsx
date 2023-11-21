import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useGetProducerPortfolio } from "../../hooks/queries/mypage";
import { UserPortfolioType } from "../../type/profile";
import ProducerPortfolio from "../portfolio/producerPortfolio";

const PAGE_LIMIT = 5;

export default function ProducerPortfolioList() {
  const { producerId } = useParams();
  const { producerPortfolios, fetchNextPage, hasNextPage } = useGetProducerPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<UserPortfolioType["portfolioId"] | null>(null);

  function selectTrack(trackId: UserPortfolioType["portfolioId"]) {
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
      <Observer ref={observerRef} />
    </PortfolioWrapper>
  );
}

const Observer = styled.div`
  width: 100%;
  height: 10px;
`;

const PortfolioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 3rem;
`;
