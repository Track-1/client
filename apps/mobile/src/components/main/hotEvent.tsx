import styled from 'styled-components';
import { SectionForm } from './common/sectionForm';
import EventContainer from '../event/eventContainer';

const EVENT_TITLE = 'Hot Events here';

export default function HotEvent() {
  return (
    <SectionForm sectionTitle={EVENT_TITLE}>
      <EventWrapper>
        <EventContainer
          eventImage={'https://fujifilm-x.com/wp-content/uploads/2021/01/gfx100s_sample_04_thum-1.jpg'}
          eventTitle={'Track1 '}
        />
      </EventWrapper>
    </SectionForm>
  );
}

const EventWrapper = styled.div``;
