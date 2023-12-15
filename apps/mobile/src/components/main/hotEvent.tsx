import styled from 'styled-components';
import { SectionForm } from './common/sectionForm';
import EventContainer from '../event/eventContainer';
import { useGetEventList } from '../../hooks/queries/admin/event';
import { useNavigate } from 'react-router-dom';
import SectionHeader from './common/sectionHeader';
import { MoreBtnIc } from '../../assets';
import TrackInfoForm from '../common/Form/trackInfoForm';
import { EventInfoType } from '../../type/event';

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
    <SectionForm>
      <SectionHeader sectionTitle={EVENT_TITLE}>
        <MoreBtnIc onClick={handleMoveEventDetail} />
      </SectionHeader>

      {eventListData && (
        <EventWrapper>
          <EventContainer
            eventImage={eventListData[0]?.eventImageFile || ''}
            eventTitle={eventListData[0]?.eventTitle || ''}
          />
          <TrackInfoForm
            topItem={'New Open'}
            topItemColor="neon_purple"
            middleItem={(eventListData && eventListData[0]?.eventTitle) || ''}>
            {eventListData[0]?.eventDate}
          </TrackInfoForm>
        </EventWrapper>
      )}
    </SectionForm>
  );
}

const EventWrapper = styled.div``;
