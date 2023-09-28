import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useGetVocalPortfolio from "../../hooks/vocalProfile/useGetVocalPortfolio";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import MusicInformation from "./musicInformation";

export default function VocalPortfolioInform() {
  const { vocalId } = useParams();
  const clickedId = useRecoilValue(clickedProfileId);
  const hoveredId = useRecoilValue(hoveredProfileId);
  const PAGE_LIMIT = 5;
  const { vocalPortfolios, fetchNextPage, hasNextPage } = useGetVocalPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(vocalId),
  });

  if (vocalPortfolios === undefined) return null;

  return (
    <InformContainer>
      {/* 제목이랑 ellipisis부분 */}
      {vocalPortfolios?.map((vocalPortfolios) => {
        return (
          <>
            {((hoveredId === -1 && clickedId === vocalPortfolios.portfolioId) ||
              (hoveredId !== -1 && hoveredId === vocalPortfolios.portfolioId)) && (
              <MusicInformation vocalPortfolios={vocalPortfolios} />
            )}
          </>
        );
      })}
    </InformContainer>
  );
}

const InformContainer = styled.section`
  width: 44rem;

  position: fixed;
  right: 0;
`;
