import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import useGetVocalPortfolio from "../../hooks/vocalProfile/useGetVocalPortfolio";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import MusicInformation from "./musicInformation";
import VocalBigPortfolio from "./vocalBigPortfolio";
import VocalSmallPortfolio from "./vocalSmallPortfolio";

export default function VocalPortfolioList() {
  const { vocalId } = useParams();
  const clickedId = useRecoilValue(clickedProfileId);
  const hoveredId = useRecoilValue(hoveredProfileId);
  const PAGE_LIMIT = 5;
  const { vocalPortfolios, fetchNextPage, hasNextPage } = useGetVocalPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(vocalId),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (vocalPortfolios === undefined) return null;

  console.log(clickedId);
  return (
    <>
      {vocalPortfolios?.map((vocalPortfolios, index) => {
        return (
          <VocalPortfolioListWrapper>
            <MiddleSection>
              {index === 0 || clickedId === vocalPortfolios.portfolioId ? (
                <VocalBigPortfolio vocalPortfolios={vocalPortfolios} />
              ) : (
                <VocalSmallPortfolio vocalPortfolios={vocalPortfolios} />
              )}
            </MiddleSection>
            <RightSection>
              {((hoveredId === -1 && clickedId === vocalPortfolios.portfolioId) ||
                (hoveredId !== -1 && hoveredId === vocalPortfolios.portfolioId)) && (
                <MusicInformation vocalPortfolios={vocalPortfolios} />
              )}
            </RightSection>
          </VocalPortfolioListWrapper>
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

const VocalPortfolioListWrapper = styled.div`
  display: flex;
`;

const MiddleSection = styled.section`
  width: 87rem;
`;

const RightSection = styled.section`
  width: 44rem;
`;
