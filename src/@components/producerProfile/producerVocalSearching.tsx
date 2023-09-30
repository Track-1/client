import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useGetProducerVocalSearching } from "../../hooks/queries/mypage";
import { clickedProfileId } from "../../recoil/common/profile";
import ProducerBigPortfolio from "../portfolio/producerBigPortfolio";
import ProducerSmallPortfolio from "../portfolio/producerSmallPortfolio";

const PAGE_LIMIT = 5;

export default function ProducerVocalSearching() {
  const { producerId } = useParams();
  const { producerVocalSearchings, fetchNextPage, hasNextPage } = useGetProducerVocalSearching({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });

  const clickedId = useRecoilValue(clickedProfileId);

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (producerVocalSearchings === undefined) return null;
  console.log(producerVocalSearchings);
  return (
    <PortfolioWrapper>
      {producerVocalSearchings?.map((producerVocalSearchings) => {
        return (
          <>
            {clickedId === producerVocalSearchings.portfolioId ? (
              <ProducerBigPortfolio producerPortfolios={producerVocalSearchings} />
            ) : (
              <ProducerSmallPortfolio producerPortfolios={producerVocalSearchings} />
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

  margin-top: 3rem;

  color: ${({ theme }) => theme.colors.white};
`;
