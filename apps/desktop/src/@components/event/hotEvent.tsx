import styled from 'styled-components';
import { useGetEventList } from '../../hooks/queries/admin/event';
import { useNavigate } from 'react-router-dom';

interface HotEventProps {
  scrollRef: React.RefObject<HTMLTableSectionElement>;
}

export default function HotEvent(props: HotEventProps) {
  const { scrollRef } = props;
  const { eventListData } = useGetEventList({
    page: 1,
    limit: 6,
  });

  const navigate = useNavigate();

  function handleMoveEventDetail() {
    eventListData && navigate(`/event/${eventListData[0]?.eventId}`);
  }

  return (
    <Styled.Container ref={scrollRef}>
      <EventSectionWrapper>
        <Styled.HotEventInfoWrapper>
          <Styled.HotEventHeadingText>{`TODAY'S\nHOT EVENT\nHERE`}</Styled.HotEventHeadingText>
          <Styled.HotEventTitle>{eventListData && eventListData[0].eventTitle}</Styled.HotEventTitle>
          <Styled.HotEventPeriod>{eventListData && eventListData[0].eventDate}</Styled.HotEventPeriod>
        </Styled.HotEventInfoWrapper>

        <Styled.HotEventThumbnailImage
          src={eventListData && eventListData[0].eventImageFile}
          alt="이벤트 썸네일"
          onClick={handleMoveEventDetail}></Styled.HotEventThumbnailImage>
      </EventSectionWrapper>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.section`
    width: 100%;

    padding: 29.3rem 10rem 0;
    margin-bottom: 29rem;
  `,

  HotEventInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;

    width: 83.5rem;
    height: 55.2rem;
  `,

  HotEventHeadingText: styled.h1`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.alexandria_heading90};

    white-space: pre-line;
  `,

  HotEventTitle: styled.h3`
    ${({ theme }) => theme.fonts.pretendard_text30};
    color: ${({ theme }) => theme.colors.white};

    margin-top: 9rem;
  `,

  HotEventPeriod: styled.p`
    ${({ theme }) => theme.fonts.pretendard_text20};
    color: ${({ theme }) => theme.colors.gray2};

    margin-top: 2rem;
  `,

  HotEventThumbnailImage: styled.img`
    width: 83.5rem;
    height: 83.5rem;

    cursor: pointer;
  `,
};

const EventSectionWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  flex-wrap: wrap;
`;
