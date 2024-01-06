import styled from 'styled-components';

import { useGetEventList } from '../../hooks/queries/admin/event';
import { useNavigate } from 'react-router-dom';
import { MoreBtnIc } from '../../assets';
import { EventInfoType } from '../../type/event';
import SectionHeader from './common/sectionHeader';
import Text from '../common/Text';
import { EventImageWrapper } from '../event/eventList';

const EVENT_TITLE = 'Hot Events here';

export default function HotEvent() {
  const { eventListData } = useGetEventList({
    page: 1,
    limit: 6,
  });

  const navigate = useNavigate();

  function handleMoveEventDetail() {
    eventListData && navigate(`/event/${eventListData[0]?.eventId}`);
  }

  return (
    <>
      <SectionHeader>
        <Text as="h2" color="white" font="Alex_20_M">
          {EVENT_TITLE}
        </Text>
        <MoreBtnIc onClick={handleMoveEventDetail} />
      </SectionHeader>

      {eventListData && (
        <EventWrapper>
          <EventImageWrapper eventImage={eventListData[0]?.eventImageFile || ''} />
          <Text as="p" font="Pre_14_R" color="neon_purple" margin="0 0 0.5rem 0">
            {'Now Open'}
          </Text>
          <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0">
            {(eventListData && eventListData[0]?.eventTitle) || ''}
          </Text>
          <Text as="p" font="Pre_14_R" color="gray3">
            {eventListData[0]?.eventDate}
          </Text>
        </EventWrapper>
      )}
    </>
  );
}

const EventWrapper = styled.div``;
