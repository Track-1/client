import styled from 'styled-components';
import EventInfo from '../main/eventInfo';
import { CommonSectionStyled } from '../main/eventSection';
import { DefaultToggleIc, EventToggleIc } from '../../assets';
import { useState } from 'react';
import { useGetEventList } from '../../hooks/queries/admin/event';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';

export default function EventList() {
  const { eventListData, fetchNextPage, hasNextPage } = useGetEventList({
    page: 1,
    limit: 6,
  });

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  const [showProgressEvent, setShowProgressEvent] = useState(false);

  function handleChangeToggle() {
    setShowProgressEvent(!showProgressEvent);
  }

  return (
    <CommonSectionStyled.SectionContainer>
      <CommonSectionStyled.HeadingWrapper>
        <CommonSectionStyled.HeadingText>Events for you</CommonSectionStyled.HeadingText>
        <Styled.ToggleWrapper>
          진행중인 이벤트
          {showProgressEvent ? (
            <Styled.EventToggleIcon onClick={handleChangeToggle} />
          ) : (
            <Styled.DefaultToggleIcon onClick={handleChangeToggle} />
          )}
        </Styled.ToggleWrapper>
      </CommonSectionStyled.HeadingWrapper>

      <CommonSectionStyled.EventInfoWrapper>
        {eventListData?.map((event) =>
          showProgressEvent ? (
            event.eventInProgress && (
              <EventInfo
                eventImage={event.eventImageFile}
                eventPeriod={event.eventDate}
                eventTitle={event.eventTitle}
                eventId={event.eventId}
                key={event.eventId}
              />
            )
          ) : (
            <EventInfo
              eventImage={event.eventImageFile}
              eventPeriod={event.eventDate}
              eventTitle={event.eventTitle}
              eventId={event.eventId}
              key={event.eventId}
            />
          )
        )}
      </CommonSectionStyled.EventInfoWrapper>
      <Styled.Observer ref={observerRef} />
    </CommonSectionStyled.SectionContainer>
  );
}

const Styled = {
  ToggleWrapper: styled.div`
    display: flex;
    align-items: center;

    ${({ theme }) => theme.fonts.pretendard_text22};
    color: ${({ theme }) => theme.colors.gray1};

    margin-top: 1.4rem;
  `,

  DefaultToggleIcon: styled(DefaultToggleIc)`
    width: 5.8rem;

    margin-left: 1.5rem;

    cursor: pointer;
  `,

  EventToggleIcon: styled(EventToggleIc)`
    width: 5.8rem;

    margin-left: 1.5rem;

    cursor: pointer;
  `,

  Observer: styled.div`
    width: 100%;
    height: 10px;
  `,
};
