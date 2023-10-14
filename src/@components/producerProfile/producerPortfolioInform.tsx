import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { EllipsisIc, ProducerProfileTitleTextIc } from "../../assets";
import useUpdateModal from "../../hooks/common/useUpdateModal";
import { useGetProducerPortfolio } from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import MusicInformation from "../portfolio/musicInformation";
import PortfolioUpdateModal from "../portfolio/portfolioUpdateModal";

interface ProducerPortfolioInformProp {
  isMe: boolean | undefined;
}

const PAGE_LIMIT = 5;

export default function ProducerPortfolioInform(props: ProducerPortfolioInformProp) {
  const { isMe } = props;
  const { producerId } = useParams();
  const { producerPortfolios } = useGetProducerPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });

  const clickedId = useRecoilValue(clickedProfileId);
  const hoveredId = useRecoilValue(hoveredProfileId);
  const { openUpdateModal, showModal, unShowModal } = useUpdateModal();
  if (producerPortfolios === undefined) return null;

  function handleShowUpdateModal() {
    !openUpdateModal ? showModal() : unShowModal();
  }

  return (
    <InformContainer>
      {producerPortfolios?.map((producerPortfolio, index) => {
        return (
          <Fragment key={producerPortfolio.portfolioId}>
            {((hoveredId === -1 && clickedId === producerPortfolio.portfolioId) ||
              (hoveredId !== -1 && hoveredId === producerPortfolio.portfolioId)) && (
              <>
                <TitleSection>
                  <TitleIconWrapper>{index === 0 && <ProducerProfileTitleTextIcon />}</TitleIconWrapper>
                  {isMe && clickedId === producerPortfolio.portfolioId && (
                    <EllipsisIcon onClick={handleShowUpdateModal} />
                  )}
                  {openUpdateModal && (
                    <PortfolioUpdateModal
                      isTitle={index === 0}
                      nowTitleId={producerPortfolios[0].portfolioId}
                      nowTitleNextId={producerPortfolios[1]?.portfolioId}
                      portfolioId={producerPortfolio.portfolioId}
                      dataState="producer portfolio"
                      clickedPortfolio={producerPortfolios[index]}
                    />
                  )}
                </TitleSection>
                <MusicInformation portfolio={producerPortfolio} />
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

const ProducerProfileTitleTextIcon = styled(ProducerProfileTitleTextIc)`
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
