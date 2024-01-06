import { useParams } from 'react-router-dom';
import { useGetEventDetail } from '../../hooks/queries/admin/event';
import styled from 'styled-components';
import { PADDING_SIDE } from '../layout';
import Text from '../common/Text';
import { Button } from 'track-1-design-system';

export default function EventDetailContainer() {
  const { eventId } = useParams();
  const { eventDetailData } = useGetEventDetail(Number(eventId));

  console.log(eventDetailData);

  return (
    <section>
      <EventImageWrapper imageUrl={eventDetailData?.eventImageFile} />
      <EventInfoWrapper>
        {eventDetailData?.eventInProgress && <NowopenTag>Now Open</NowopenTag>}
        <Text as="h2" font="Pre_30_SB" color="white" margin="0 0 1rem 0">
          {eventDetailData?.eventTitle}
        </Text>
        <Text as="p" font="Pre_16_R" color="gray2" margin="0 0 5rem 0">
          {eventDetailData?.eventDate}
        </Text>

        <Text as="p" font="Pre_15_R" color="white" lineHeight="170%" margin="0 0 10rem 0">
          {eventDetailData?.eventIntroduction}
        </Text>
      </EventInfoWrapper>
    </section>
  );
}

const EventImageWrapper = styled.div<{ imageUrl?: string }>`
  width: calc(${`100% + ${PADDING_SIDE}*2`});
  height: 45.8rem;

  margin-left: ${`-${PADDING_SIDE}`};

  background-image: linear-gradient(180deg, #0d0e11 0%, rgba(13, 14, 17, 0) 100%), url(${({ imageUrl }) => imageUrl});

  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const EventInfoWrapper = styled.div`
  margin-top: 3rem;

  user-select: text;
`;

const NowopenTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 9rem;
  height: 3rem;

  ${({ theme }) => theme.fonts.Pre_14_M};
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.neon_purple};
  border-radius: 1.3rem;

  margin-bottom: 2rem;
`;
