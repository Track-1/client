import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { EllipsisIc, VocalPortfolioTitleTextIc } from "../../assets";
import useUpdateModal from "../../hooks/common/useUpdateModal";
import { useGetVocalPortfolio } from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import MusicInformation from "../portfolio/musicInformation";
import PortfolioUpdateModal from "../portfolio/portfolioUpdateModal";

interface VocalPortfolioInformProp {
  isMe: boolean | undefined;
}

const PAGE_LIMIT = 5;

export default function VocalPortfolioInform(props: VocalPortfolioInformProp) {
  const { isMe } = props;
  const { vocalId } = useParams();
  const clickedId = useRecoilValue(clickedProfileId);
  const hoveredId = useRecoilValue(hoveredProfileId);
  const { openUpdateModal, showModal, unShowModal } = useUpdateModal();
  const { vocalPortfolios, fetchNextPage, hasNextPage } = useGetVocalPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(vocalId),
  });

  if (vocalPortfolios === undefined) return null;

  function handleShowUpdateModal() {
    !openUpdateModal ? showModal() : unShowModal();
  }

  return (
    <InformContainer>
      {vocalPortfolios?.map((vocalPortfolio, index) => {
        return (
          <Fragment key={vocalPortfolio.portfolioId}>
            {((hoveredId === -1 && clickedId === vocalPortfolio.portfolioId) ||
              (hoveredId !== -1 && hoveredId === vocalPortfolio.portfolioId)) && (
              <>
                <TitleSection>
                  <TitleIconWrapper>{index === 0 && <VocalPortfolioTitleTextIcon />}</TitleIconWrapper>
                  {isMe && clickedId === vocalPortfolio.portfolioId && <EllipsisIcon onClick={handleShowUpdateModal} />}
                  {openUpdateModal && (
                    <PortfolioUpdateModal
                      isTitle={index === 0}
                      nowTitleId={vocalPortfolios[0].portfolioId}
                      nowTitleNextId={vocalPortfolios[1].portfolioId}
                      portfolioId={vocalPortfolio.portfolioId}
                      dataState="vocal portfolio"
                      clickedPortfolio={vocalPortfolios[index]}
                    />
                  )}
                </TitleSection>
                <MusicInformation portfolio={vocalPortfolio} />
              </>
            )}
          </Fragment>
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
