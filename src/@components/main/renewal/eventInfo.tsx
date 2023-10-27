import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface EventInfoProps {
  eventImage: string;
  eventTitle: string;
  eventPeriod: string;
  eventDday?: string;
  eventId: number;
}

export default function EventInfo(props: EventInfoProps) {
  const { eventImage, eventTitle, eventPeriod, eventDday, eventId } = props;

  const navigate = useNavigate();

  function handleMoveEventDetail() {
    navigate(`/event/${eventId}`);
  }

  return (
    <Styled.Container>
      <Styled.EventImageWrapper>
        <Styled.EventImage src={eventImage} alt="이벤트 포스터 이미지" onClick={handleMoveEventDetail} />
        {eventDday && <Styled.DdayLabel>{eventDday}</Styled.DdayLabel>}
      </Styled.EventImageWrapper>
      <Styled.EventTitle>{eventTitle}</Styled.EventTitle>
      <Styled.EventPeriod>{eventPeriod}</Styled.EventPeriod>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.article`
    display: flex;
    flex-direction: column;

    width: 83.5rem;
  `,

  EventImageWrapper: styled.div`
    position: relative;

    width: 83.5rem;
    height: 55.2rem;

    overflow: hidden;
  `,

  EventImage: styled.img`
    cursor: pointer;
  `,

  EventTitle: styled.h3`
    ${({ theme }) => theme.fonts.pretendard_text30};
    color: ${({ theme }) => theme.colors.white};

    margin: 4rem 0 2rem;
  `,

  EventPeriod: styled.p`
    ${({ theme }) => theme.fonts.pretendard_text20};
    color: ${({ theme }) => theme.colors.gray2};
  `,

  DdayLabel: styled.div`
    position: absolute;
    top: 4rem;
    right: 4rem;

    padding: 1.8rem 3.1rem;

    ${({ theme }) => theme.fonts.pretendard_text25_700};
    color: ${({ theme }) => theme.colors.white};

    border-radius: 3.35rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.white};
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  `,
};
