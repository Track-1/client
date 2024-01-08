import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { useGetEventList } from '../../hooks/queries/admin/event';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import SectionHeader from '../main/common/sectionHeader';
import Text from '../common/Text';
import { css } from 'styled-components';
import { InfinityObserver } from '../common/Interface';
import { useMovePage } from '../../hooks/common/useMovePage';

export default function EventList() {
  const { eventListData, fetchNextPage, hasNextPage } = useGetEventList({
    page: 1,
    limit: 6,
  });

  const { handleMovePage } = useMovePage();

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  const [showProgressEvent, setShowProgressEvent] = useState<'on' | 'off'>('off');

  function handleChangeToggle() {
    setShowProgressEvent(showProgressEvent === 'on' ? 'off' : 'on');
  }

  return (
    <section>
      <SectionHeader>
        <Text as="h2" color="white" font="Alex_20_M">
          {'Events for you'}
        </Text>

        <ToggleWrapper>
          <Text as="p" color="gray3" font="Pre_14_R">
            진행 중
          </Text>
          <div onClick={handleChangeToggle}>
            <DefaultRoot switchState={showProgressEvent}>
              <DefaultThumb switchState={showProgressEvent} />
            </DefaultRoot>
          </div>
        </ToggleWrapper>
      </SectionHeader>

      <EventListWrapper>
        {eventListData &&
          eventListData?.map((event) =>
            showProgressEvent === 'on' ? (
              event?.eventInProgress && (
                <EventWrapper>
                  <EventImageWrapper
                    eventImage={event.eventImageFile}
                    onClick={() => handleMovePage('event', event.eventId)}
                  />
                  <div onClick={() => handleMovePage('event', event.eventId)}>
                    <Text as="p" font="Pre_14_R" color="neon_purple" margin="0 0 0.5rem 0">
                      {event.eventNowOpen ? 'Now open' : ''}
                    </Text>
                    <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0">
                      {event.eventTitle}
                    </Text>
                    <Text as="p" font="Pre_14_R" color="gray3">
                      {event.eventDate}
                    </Text>
                  </div>
                </EventWrapper>
              )
            ) : (
              <EventWrapper>
                <EventImageWrapper
                  eventImage={event?.eventImageFile || ''}
                  onClick={() => handleMovePage('event', event?.eventId)}
                />
                <div onClick={() => handleMovePage('event', event?.eventId)}>
                  <Text as="p" font="Pre_14_R" color="neon_purple" margin="0 0 0.5rem 0">
                    {event?.eventNowOpen ? 'Now open' : ''}
                  </Text>
                  <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0">
                    {event?.eventTitle}
                  </Text>
                  <Text as="p" font="Pre_14_R" color="gray3">
                    {event?.eventDate}
                  </Text>
                </div>
              </EventWrapper>
            )
          )}
      </EventListWrapper>
      <InfinityObserver ref={observerRef} />
    </section>
  );
}

const DefaultRoot = styled.div<{ width?: number; height?: number; switchState: 'on' | 'off' }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: ${(props) => (props.width ? props.width : 4.6)}rem;
  height: ${(props) => (props.height ? props.height : 2.2)}rem;

  border-radius: 15px;
  padding: 0 0.3rem;

  ${({ switchState }) =>
    switchState === 'on'
      ? css`
          background-color: ${({ theme }) => theme.colors.neon_purple};
          justify-content: flex-start;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.gray4};
          justify-content: flex-end;
        `}
`;

const moveRightAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const moveLeftAnimation = keyframes`
  0% {
      transform: translateX(100%);
}
100% {
      transform: translateX(0);
  }
`;

const DefaultThumb = styled.div<{ switchState: 'on' | 'off'; height?: number }>`
  width: ${(props) => (props.height ? props.height : 1.8)}rem;
  height: ${(props) => (props.height ? props.height : 1.8)}rem;

  border-radius: 50%;

  ${({ switchState }) =>
    switchState === 'on'
      ? css`
          background-color: ${({ theme }) => theme.colors.gray2};
          ${moveRightAnimation} 0 linear forwards;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.gray2};
          ${moveLeftAnimation} 0 linear forwards;
        `}
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const EventWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const EventImageWrapper = styled.div<{ eventImage: string }>`
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
