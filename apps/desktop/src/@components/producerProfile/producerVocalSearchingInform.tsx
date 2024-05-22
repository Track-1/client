import styled from 'styled-components';
import useUpdateModal from '../../hooks/common/useUpdateModal';
import PortfolioUpdateModal from '../portfolio/portfolioUpdateModal';
import ViewMoreButton from './viewMoreButton';
import VocalSearchingMusicInform from './vocalSearchingMusicInform';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { EllipsisIc } from '../../assets';
import { useGetProducerVocalSearching } from '../../hooks/queries/mypage';
import { clickedProfileId, hoveredProfileId } from '../../recoil/common/profile';

interface ProducerVocalSearchingInformProp {
  isMe: boolean | undefined;
}

const PAGE_LIMIT = 5;

export default function ProducerVocalSearchingInform(props: ProducerVocalSearchingInformProp) {
  const { isMe } = props;
  const { producerId } = useParams();
  const { data: producerVocalSearchings } = useGetProducerVocalSearching({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });
  const clickedId = useRecoilValue(clickedProfileId);
  const hoveredId = useRecoilValue(hoveredProfileId);
  const { openUpdateModal, showModal, unShowModal } = useUpdateModal();

  function handleShowUpdateModal() {
    !openUpdateModal ? showModal() : unShowModal();
  }

  if (producerVocalSearchings === undefined) return null;

  return (
    <InformContainer>
      {producerVocalSearchings?.map((producerVocalSearching, index) => {
        return (
          <Fragment key={producerVocalSearching.trackId}>
            {((hoveredId === '' && clickedId === producerVocalSearching.trackId) ||
              (hoveredId !== '' && hoveredId === producerVocalSearching.trackId)) && (
              <>
                <TitleSection>
                  {clickedId === producerVocalSearching.trackId && (
                    <ViewMoreButton id={producerVocalSearching.trackId} />
                  )}
                  {isMe && clickedId === producerVocalSearching.trackId && (
                    <EllipsisIcon onClick={handleShowUpdateModal} />
                  )}
                  {openUpdateModal && (
                    <PortfolioUpdateModal
                      isTitle={index === 0}
                      nowTitleId={producerVocalSearchings[0].trackId}
                      nowTitleNextId={producerVocalSearchings[1]?.trackId}
                      portfolioId={producerVocalSearching.trackId}
                      dataState="producer vocal searching"
                      clickedProducerVocalSearching={producerVocalSearchings[index]}
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
