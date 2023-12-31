import styled from 'styled-components';
import { PADDING_SIDE } from '../layout';
import { useGetEventList } from '../../hooks/queries/admin/event';
import TrackInfoTextForm from '../common/Form/trackInfoTextForm';
import Text from '../common/Text';
import { useMovePage } from '../../hooks/common/useMovePage';

export default function MainEvent() {
  const { eventListData } = useGetEventList({
    page: 1,
    limit: 6,
  });

  const { handleMovePage } = useMovePage();

  const recentEventId = eventListData?.[0]?.eventId;

  return (
    <Container>
      <MainText>{'TODAY’S\nHOT EVENT HERE'}</MainText>
      <ImageWrapper
        eventImage={eventListData?.[0]?.eventImageFile || ''}
        onClick={() => handleMovePage('event', recentEventId)}
      />
      <InfoTextWrapper onClick={() => handleMovePage('event', recentEventId)}>
        <TrackInfoTextForm
          topItem={eventListData?.[0]?.eventInProgress ? 'New open' : undefined}
          topItemColor="neon_purple"
          middleItem={eventListData?.[0]?.eventTitle || ''}>
          <Text as="p" color="gray3" font="Pre_14_R">
            {eventListData?.[0]?.eventDate || ''}
          </Text>
        </TrackInfoTextForm>
      </InfoTextWrapper>
    </Container>
  );
}

const MainText = styled.h1`
  position: absolute;
  top: 10.4rem;
  left: 2.5rem;

  ${({ theme }) => theme.fonts.Alex_50_R};
  color: ${({ theme }) => theme.colors.white};

  white-space: pre-line;
`;

const Container = styled.section`
  width: calc(${`100% + ${PADDING_SIDE}*2`});

  padding-top: 10.4rem;
  margin-left: ${`-${PADDING_SIDE}`};

  margin-bottom: 10rem;
`;

const ImageWrapper = styled.div<{ eventImage: string }>`
  width: 100%;
  height: 25.9rem;

  overflow: hidden;

  background-image: url(${(props) => props.eventImage});
  background-position: center center;
  background-size: cover;
`;

const InfoTextWrapper = styled.div`
  margin-top: 3rem;
  padding: ${`0 ${PADDING_SIDE}`};
`;
