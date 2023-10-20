import styled from "styled-components";

interface EventInfoProps {
  eventImage: string;
  eventTitle: string;
  eventPeriod: string;
}

export default function EventInfo(props: EventInfoProps) {
  const { eventImage, eventTitle, eventPeriod } = props;

  return (
    <Styled.Container>
      <Styled.EventImageWrapper>
        <Styled.EventImage src={eventImage} alt="이벤트 포스터 이미지" />
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
};
