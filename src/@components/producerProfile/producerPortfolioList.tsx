import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useGetProducerPortfolio } from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import ProducerBigPortfolio from "../portfolio/producerBigPortfolio";
import ProducerSmallPortfolio from "../portfolio/producerSmallPortfolio";

const PAGE_LIMIT = 5;

export default function ProducerPortfolioList() {
  const { producerId } = useParams();
  const { producerPortfolios, fetchNextPage, hasNextPage } = useGetProducerPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });

  const clickedId = useRecoilValue(clickedProfileId);
  const hoveredId = useRecoilValue(hoveredProfileId);

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (producerPortfolios === undefined) return null;
  console.log(producerPortfolios);
  return (
    <PortfolioWrapper>
      {producerPortfolios?.map((producerPortfolios, index) => {
        return (
          <>
            {index === 0 || clickedId === producerPortfolios.portfolioId ? (
              <ProducerBigPortfolio producerPortfolios={producerPortfolios} />
            ) : (
              <ProducerSmallPortfolio producerPortfolios={producerPortfolios} />
            )}
          </>
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

  /* margin-top: -18rem; */
`;
