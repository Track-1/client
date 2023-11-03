import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useGetVocalPortfolio } from "../../hooks/queries/mypage";
import { UserPortfolioType } from "../../type/profile";
import VocalPortfolio from "../portfolio/vocalPortfolio";

const PAGE_LIMIT = 5;

export default function VocalPortfolioList() {
  const { vocalId } = useParams();
  const { vocalPortfolios, fetchNextPage, hasNextPage } = useGetVocalPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(vocalId),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<UserPortfolioType["portfolioId"] | null>(null);

  function selectTrack(trackId: UserPortfolioType["portfolioId"]) {
    setPLayingTrack(trackId);
  }

  if (vocalPortfolios === undefined) return null;

  return (
    <VocalPortfolioListWrapper>
      <VocalsBoxHead />
      <VocalsBoxBody>
        <PortfolioWrapper>
          {vocalPortfolios?.map((vocalPortfolios, index) => {
            return (
              <VocalPortfolio
                vocalPortfolios={vocalPortfolios}
                isFirst={index === 0}
                playingTrack={playingTrack}
                selectTrack={selectTrack}
              />
            );
          })}
          <Observer ref={observerRef} />
        </PortfolioWrapper>
      </VocalsBoxBody>
    </VocalPortfolioListWrapper>
  );
}

const Observer = styled.div`
  width: 100%;
  height: 10px;
`;

const VocalPortfolioListWrapper = styled.section`
  width: 87rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VocalsBoxHead = styled.div`
  width: 36rem;
  height: 36rem;
  margin: 31rem 0 0 18rem;

  transform: rotate(45deg);

  border: 0.34rem solid ${({ theme }) => theme.colors.sub2};
  border-radius: 5rem 2.8rem 5.4rem 2.8rem;
`;

const VocalsBoxBody = styled.div`
  margin-left: 18rem;
  margin-top: 48.5rem;
  margin-bottom: 3rem;

  position: absolute;

  width: 48.55rem;

  border-left: 0.34rem solid transparent;
  border-right: 0.34rem solid transparent;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to top, ${({ theme }) => theme.colors.sub3} -5%, ${({ theme }) => theme.colors.sub2} 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const PortfolioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: -18rem;
`;
