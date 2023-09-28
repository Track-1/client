import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { EllipsisIc, VocalPortfolioTitleTextIc } from "../../assets";
import useGetVocalPortfolio from "../../hooks/vocalProfile/useGetVocalPortfolio";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import MusicInformation from "./musicInformation";

interface VocalPortfolioInformProp {
  isMe: boolean | undefined;
}

const PAGE_LIMIT = 5;

export default function VocalPortfolioInform(props: VocalPortfolioInformProp) {
  const { isMe } = props;
  const { vocalId } = useParams();
  const clickedId = useRecoilValue(clickedProfileId);
  const hoveredId = useRecoilValue(hoveredProfileId);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { vocalPortfolios, fetchNextPage, hasNextPage } = useGetVocalPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(vocalId),
  });

  if (vocalPortfolios === undefined) return null;

  function handleShowUpdateModal() {
    setOpenUpdateModal((oum) => !oum);
  }

  return (
    <InformContainer>
      {/* 제목이랑 ellipisis부분 */}
      {vocalPortfolios?.map((vocalPortfolios, index) => {
        return (
          <>
            {((hoveredId === -1 && clickedId === vocalPortfolios.portfolioId) ||
              (hoveredId !== -1 && hoveredId === vocalPortfolios.portfolioId)) && (
              <>
                <TitleSection>
                  <TitleIconWrapper>{index === 0 && <VocalPortfolioTitleTextIcon />}</TitleIconWrapper>
                  {isMe && clickedId === vocalPortfolios.portfolioId && (
                    <EllipsisIcon onClick={handleShowUpdateModal} />
                  )}
                </TitleSection>
                <MusicInformation vocalPortfolios={vocalPortfolios} />
              </>
            )}
          </>
        );
      })}
    </InformContainer>
  );
}

const EllipsisIcon = styled(EllipsisIc)`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const TitleSection = styled.header`
  height: 4.3rem;
  display: flex;
  justify-content: space-between;
  width: 38rem;
`;

const VocalPortfolioTitleTextIcon = styled(VocalPortfolioTitleTextIc)`
  width: 13.4rem;
`;

const InformContainer = styled.section`
  width: 44rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1.6rem;
  position: fixed;
  right: 0;
`;

const TitleIconWrapper = styled.div`
  width: 13.4rem;
`;
