import styled from "styled-components";
import EventInfo from "./eventInfo";

export default function EventSection() {
  const event = {
    eventImage: "https://inclass-file.s3.ap-northeast-2.amazonaws.com/lightProduct/1_1(10).png",
    eventTitle: "하늘공원 박람회",
    eventPeriod: "2023. 10. 4 ~ 10. 31",
  };
  return (
    <Styled.SectionContainer>
      <Styled.HeadingWrapper>
        <Styled.HeadingText>Hot Events here</Styled.HeadingText>
        <Styled.ShowMoreText>more</Styled.ShowMoreText>
      </Styled.HeadingWrapper>

      <Styled.EventInfoWrapper>
        <EventInfo eventImage={event.eventImage} eventTitle={event.eventTitle} eventPeriod={event.eventPeriod} />
        <EventInfo eventImage={event.eventImage} eventTitle={event.eventTitle} eventPeriod={event.eventPeriod} />
      </Styled.EventInfoWrapper>
    </Styled.SectionContainer>
  );
}

const Styled = {
  SectionContainer: styled.section`
    width: 100%;
    height: 96.8em;

    padding: 0 10rem;
  `,

  HeadingWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 4.6rem;
  `,

  HeadingText: styled.h2`
    ${({ theme }) => theme.fonts.heading38};
    color: ${({ theme }) => theme.colors.white};
  `,

  ShowMoreText: styled.p`
    ${({ theme }) => theme.fonts.text22};
    color: ${({ theme }) => theme.colors.gray3};

    cursor: pointer;

    text-decoration: underline;
    text-underline-offset: 0.3rem;

    margin-top: 2rem;
  `,

  EventInfoWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    margin-top: 5rem;
  `,
};
