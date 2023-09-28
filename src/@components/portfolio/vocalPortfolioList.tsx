import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import useGetVocalPortfolio from "../../hooks/vocalProfile/useGetVocalPortfolio";
import VocalSmallPortfolio from "./vocalSmallPortfolio";

export default function VocalPortfolioList() {
  const { vocalId } = useParams();
  const PAGE_LIMIT = 5;
  const { vocalPortfolios, fetchNextPage, hasNextPage } = useGetVocalPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(vocalId),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (vocalPortfolios === undefined) return null;
  console.log(vocalPortfolios);
  return (
    <>
      {vocalPortfolios?.map(({ portfolioId, portfolioImageFile, portfolioAudioFile }, index) => {
        return (
          <VocalSmallPortfolio
            portfolioId={portfolioId}
            portfolioImageFile={portfolioImageFile}
            portfolioAudioFile={portfolioAudioFile}
          />
        );
      })}
      <Observer ref={observerRef} />
    </>
  );
}

const Observer = styled.div`
  width: 100%;
  height: 10px;
`;
