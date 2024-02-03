import styled from 'styled-components';
import EventInfo from './eventInfo';
import { useNavigate } from 'react-router-dom';
import { useGetEventList } from '../../hooks/queries/admin/event';

export default function EventSection() {
  const { eventListData } = useGetEventList({
    page: 1,
    limit: 2,
  });

  const navigate = useNavigate();

  function handleMoveEventPage() {
    navigate('/event');
  }

  return (
    <CommonSectionStyled.SectionContainer>
      <CommonSectionStyled.HeadingWrapper>
        <CommonSectionStyled.HeadingText>Hot Events here</CommonSectionStyled.HeadingText>
        <CommonSectionStyled.ShowMoreText onClick={handleMoveEventPage}>more</CommonSectionStyled.ShowMoreText>
      </CommonSectionStyled.HeadingWrapper>

      <CommonSectionStyled.EventInfoWrapper>
        {eventListData?.map((event) => (
          <EventInfo
            eventImage={event.eventImageFile}
            eventTitle={event.eventTitle}
            eventPeriod={event.eventDate}
            eventDday={event.eventDday}
            eventId={event.eventId}
            key={event.eventId}
          />
        ))}
      </CommonSectionStyled.EventInfoWrapper>
    </CommonSectionStyled.SectionContainer>
  );
}

export const CommonSectionStyled = {
  SectionContainer: styled.section`
    width: 100%;

    padding: 0 10rem;

    margin-bottom: 20rem;
  `,

  HeadingWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 4.6rem;

    margin-bottom: 5rem;
  `,

  HeadingText: styled.h2`
    ${({ theme }) => theme.fonts.alexandria_heading38};
    color: ${({ theme }) => theme.colors.white};

    white-space: pre-line;
  `,

  ShowMoreText: styled.p`
    ${({ theme }) => theme.fonts.text22};
    color: ${({ theme }) => theme.colors.gray3};

    cursor: pointer;

    text-decoration: underline;
    text-underline-offset: 0.3rem;

    margin-top: 1.4rem;
  `,

  EventInfoWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15rem 0;

    width: 100%;

    margin-top: 5rem;
  `,
};
