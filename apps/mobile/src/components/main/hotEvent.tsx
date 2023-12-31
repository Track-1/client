import styled from 'styled-components';

import { useGetEventList } from '../../hooks/queries/admin/event';
import { useNavigate } from 'react-router-dom';
import { MoreBtnIc } from '../../assets';
import TrackInfoTextForm from '../common/Form/trackInfoTextForm';
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
          <TrackInfoTextForm
            topItem={'New Open'}
            topItemColor="neon_purple"
            middleItem={(eventListData && eventListData[0]?.eventTitle) || ''}>
            {eventListData[0]?.eventDate}
          </TrackInfoTextForm>
        </EventWrapper>
      )}
    </>
  );
}

const EventWrapper = styled.div``;
