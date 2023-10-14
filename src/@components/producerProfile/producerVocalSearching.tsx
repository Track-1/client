import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useGetProducerVocalSearching } from "../../hooks/queries/mypage";
import { clickedProfileId } from "../../recoil/common/profile";
import { UserPortfolioType } from "../../type/profile";
import ProducerVocalSearchingPortfolio from "./ProducerVocalSearchingPortfolio";

const PAGE_LIMIT = 5;

export default function ProducerVocalSearching() {
  const { producerId } = useParams();
  const { producerVocalSearchings, fetchNextPage, hasNextPage } = useGetProducerVocalSearching({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });

  const [clickId, setClickId] = useRecoilState(clickedProfileId);
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<UserPortfolioType["portfolioId"] | null>(null);

  function selectTrack(trackId: UserPortfolioType["portfolioId"]) {
    setPLayingTrack(trackId);
  }
  if (producerVocalSearchings === undefined) return null;

  function checkFirstTrackPlaying() {
    if (producerVocalSearchings) {
      return clickId === producerVocalSearchings[0].trackId;
    }
    return false;
  }

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
      <Observer ref={observerRef} />
    </PortfolioWrapper>
  );
}

const Observer = styled.div`
  width: 100%;
  height: 10px;
`;

const PortfolioWrapper = styled.div<{ isFirstPlaying: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 3rem;
  padding-top: ${({ isFirstPlaying }) => (isFirstPlaying ? 0 : 10)}rem;
  padding-bottom: 10rem;

  color: ${({ theme }) => theme.colors.white};
`;
