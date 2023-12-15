import styled from 'styled-components';

interface EventContainerProps {
  eventImage: string;
  eventTitle: string;
}

export default function EventContainer(props: EventContainerProps) {
  const { eventImage, eventTitle } = props;
  return (
    <Container eventImage={eventImage}>
      <EventTitle>{eventTitle}</EventTitle>
    </Container>
  );
}

const Container = styled.div<{ eventImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 22.5rem;

  overflow: hidden;

  background-image: url(${(props) => props.eventImage});
  background-position: center center;
  background-size: cover;
`;

const EventTitle = styled.h2`
  ${({ theme }) => theme.fonts.Alex_30_R};
  color: ${({ theme }) => theme.colors.white};
`;
