import styled from 'styled-components';

import { useGetEventList } from '../../hooks/queries/admin/event';
import { useNavigate } from 'react-router-dom';
import { MoreBtnIc } from '../../assets';
import { EventInfoType } from '../../type/event';
import SectionHeader from './common/sectionHeader';
import Text from '../common/Text';
import { EventImageWrapper } from '../event/eventList';
import { Link } from 'react-router-dom';

const EVENT_TITLE = 'Hot Events here';

export default function HotEvent() {
  const { eventListData } = useGetEventList({
    page: 1,
    limit: 6,
  });

  return (
    <Container>
      <SectionHeader>
        <Text as="h2" color="white" font="Alex_20_M">
          {EVENT_TITLE}
        </Text>
        <Link to="/event">
          <MoreBtnIc />
        </Link>
      </SectionHeader>

      {eventListData && (
        <EventWrapper>
          <Link to={`/event/${eventListData[0]?.eventId}`}>
            <EventImageWrapper eventImage={eventListData[0]?.eventImageFile || ''} />
          </Link>

          <Link to={`/event/${eventListData[0]?.eventId}`}>
            <Text as="p" font="Pre_14_R" color="neon_purple" margin="0 0 0.5rem 0">
              {eventListData[0]?.eventNowOpen ? 'Now open' : ''}
            </Text>
            <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0">
              {(eventListData && eventListData[0]?.eventTitle) || ''}
            </Text>
            <Text as="p" font="Pre_14_R" color="gray3">
              {eventListData[0]?.eventDate}
            </Text>
          </Link>
        </EventWrapper>
      )}
    </Container>
  );
}

const Container = styled.section`
  margin-bottom: 10rem;
`;

const EventWrapper = styled.div``;
