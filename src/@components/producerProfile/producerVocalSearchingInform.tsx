import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { EllipsisIc, ProducerProfileTitleTextIc } from "../../assets";
import useUpdateModal from "../../hooks/common/useUpdateModal";
import { useGetProducerVocalSearching } from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import PortfolioUpdateModal from "../portfolio/portfolioUpdateModal";
import ViewMoreButton from "./viewMoreButton";
import VocalSearchingMusicInform from "./vocalSearchingMusicInform";

interface ProducerVocalSearchingInformProp {
  isMe: boolean | undefined;
}

const PAGE_LIMIT = 5;

export default function ProducerVocalSearchingInform(props: ProducerVocalSearchingInformProp) {
  const { isMe } = props;
  const { producerId } = useParams();
  const { producerVocalSearchings } = useGetProducerVocalSearching({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });

  const clickedId = useRecoilValue(clickedProfileId);
  const hoveredId = useRecoilValue(hoveredProfileId);
  const { openUpdateModal, showModal, unShowModal } = useUpdateModal();

  if (producerVocalSearchings === undefined) return null;

  function handleShowUpdateModal() {
    !openUpdateModal ? showModal() : unShowModal();
  }

  return (
    <InformContainer>
      {producerVocalSearchings?.map((producerVocalSearching, index) => {
        return (
          <Fragment key={producerVocalSearching.trackId}>
            {((hoveredId === -1 && clickedId === producerVocalSearching.trackId) ||
              (hoveredId !== -1 && hoveredId === producerVocalSearching.trackId)) && (
              <>
                <TitleSection>
                  <ViewMoreButton id={producerVocalSearching.trackId} />
                  {isMe && clickedId === producerVocalSearching.trackId && (
                    <EllipsisIcon onClick={handleShowUpdateModal} />
                  )}
                  {openUpdateModal && (
                    <PortfolioUpdateModal
                      isTitle={index === 0}
                      nowTitleId={producerVocalSearchings[0].trackId}
                      nowTitleNextId={producerVocalSearchings[1].trackId}
                      portfolioId={producerVocalSearching.trackId}
                      dataState="producer vocal searching"
                    />
                  )}
                </TitleSection>
                <VocalSearchingMusicInform portfolio={producerVocalSearching} />
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
