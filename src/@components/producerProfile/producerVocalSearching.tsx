import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useGetProducerVocalSearching } from "../../hooks/queries/mypage";
import { UserPortfolioType } from "../../type/profile";
import ProducerVocalSearchingPortfolio from "./ProducerVocalSearchingPortfolio";

const PAGE_LIMIT = 5;

export default function ProducerVocalSearching() {
  const { producerId } = useParams();
  const { producerVocalSearchings, fetchNextPage, hasNextPage } = useGetProducerVocalSearching({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<UserPortfolioType["portfolioId"] | null>(null);

  function selectTrack(trackId: UserPortfolioType["portfolioId"]) {
    setPLayingTrack(trackId);
  }
  if (producerVocalSearchings === undefined) return null;

  return (
    <PortfolioWrapper>
      {producerVocalSearchings?.map((producerVocalSearchings) => {
        return (
          <ProducerVocalSearchingPortfolio
            producerVocalSearchings={producerVocalSearchings}
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

  color: ${({ theme }) => theme.colors.white};
`;
