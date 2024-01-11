import styled from 'styled-components';

import { ImageWrapper } from '../Interface';
import { Cover } from 'track-1-design-system';
import Text from '../Text';
import { useTrackDetail } from '../../../hooks/queries/tracks';
import { StyledDivisionLine } from '../DivisionLine';
import { ProfileUserIc, TrackDetailIc } from '../../../assets';
import { Link } from 'react-router-dom';
import BottomUpModal from './bottomUpModal';

import { useMovePage } from '../../../hooks/common/useMovePage';

interface DetailTrackModalProps {
  openModal: boolean;
  showModal: () => void;
  unShowModal: () => void;
  detailId: number;
}

export default function DetailTrackModal(props: DetailTrackModalProps) {
  const { openModal, showModal, unShowModal, detailId } = props;

  const { trackDetail } = useTrackDetail(detailId);
  const { handleMovePage, checkUserPermission } = useMovePage();

  return (
    <BottomUpModal openModal={openModal} showModal={showModal} unShowModal={unShowModal}>
      <Container>
        <TrackInfoWrapper>
          <ImageWrapper width={9.5} height={9.5}>
            <Cover width={9.5} height={9.5} imageUrl={trackDetail?.trackImageFile || ''} shape="rectangle" />
          </ImageWrapper>

          <TextInfoWrapper>
            <Text as="p" font="Pre_14_R" color="neon_green" margin="0 0 0.5rem 0">
              {trackDetail?.trackCategory}
            </Text>
            <Text as="p" font="Alex_16_R" color="white" margin="0 0 3.1rem 0">
              {trackDetail?.trackTitle || ''}
            </Text>
            <Text as="p" font="Pre_16_R" color="white">
              {trackDetail?.trackUserName}
            </Text>
          </TextInfoWrapper>
        </TrackInfoWrapper>
        <KeywordWrapper>
          {trackDetail?.trackKeyword.map((keyword) => (
            <Keyword>{`#${keyword}`}</Keyword>
          ))}
        </KeywordWrapper>
        <Text as="p" font="Pre_16_R" color="gray2" lineHeight="155%">
          {trackDetail?.trackIntroduction}
        </Text>
      </Container>
      <StyledDivisionLine />
      <LinkTextWrapper>
        <LinkItem>
          <ProfileUserIc />
          <Text as="span" font="Pre_18_R" color="white">
            <a onClick={() => checkUserPermission() && handleMovePage('producer-profile', trackDetail?.trackUserId)}>
              Go to Producer Profile
            </a>
          </Text>
        </LinkItem>
        <LinkItem>
          <TrackDetailIc />
          <Text as="span" font="Pre_18_R" color="white">
            <Link to={`/track-post/${trackDetail?.trackId}`}>Track Details</Link>
          </Text>
        </LinkItem>
      </LinkTextWrapper>
    </BottomUpModal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 3rem;
  margin: 2.8rem 0 4.2rem;
`;

const TrackInfoWrapper = styled.div`
  display: flex;
  gap: 2rem;

  width: 100%;
`;

const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  width: 100%;

  padding: 2rem 0;
  margin-top: 1rem;
`;

const Keyword = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.gray2};

  border: 1px solid ${({ theme }) => theme.colors.gray2};
  padding: 0.7rem 1rem;
  border-radius: 1.55rem;
`;

const LinkTextWrapper = styled.ul`
  width: 100%;

  padding: 0 3rem;
  margin-bottom: 3.5rem;
`;

const LinkItem = styled.li`
  display: flex;
  gap: 1rem;

  margin-top: 3.5rem;
`;

const TextInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
