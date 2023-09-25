import { Fragment } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import useGetVocalPortfolio from "../../hooks/vocalProfile/useGetVocalPortfolio";
import VocalSmallPortfolio from "./vocalSmallPortfolio";

export default function VocalPortfolioList() {
  const { vocalId } = useParams();
  const PAGE_LIMIT = 5;
  const { vocalPortfolios, fetchNextPage, hasNextPage } = useGetVocalPortfolio(Number(vocalId), PAGE_LIMIT);
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  return (
    <>
      {vocalPortfolios?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page?.data.map(({ portfolioId, portfolioImageFile, portfolioAudioFile }) => (
            <VocalSmallPortfolio
              portfolioId={portfolioId}
              portfolioImageFile={portfolioImageFile}
              portfolioAudioFile={portfolioAudioFile}
            />
          ))}
        </Fragment>
      ))}
      <Observer ref={observerRef} />
    </>
  );
}

const Observer = styled.div``;
