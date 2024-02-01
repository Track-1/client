import styled from 'styled-components';
import { EventBackBtnIc } from '../../assets';
import { CommonSectionStyled } from '../main/eventSection';
import { useParams } from 'react-router-dom';
import { useGetEventDetail } from '../../hooks/queries/admin/event';
import usePrevPage from '../../hooks/common/usePrevPage';

export default function EventDetail() {
  const { eventId } = useParams();

  const { eventDetailData } = useGetEventDetail(Number(eventId));

  const { handleMovePrevPage } = usePrevPage();

  return (
    <>
      <Styled.DetailTopWrapper>
        <Styled.EventBackBtnIcon onClick={handleMovePrevPage} />
        <CommonSectionStyled.HeadingText>Events for you</CommonSectionStyled.HeadingText>
        <Styled.DdayText>{eventDetailData?.eventDday}</Styled.DdayText>
      </Styled.DetailTopWrapper>

      <Styled.DetailEventImageWarpper>
        <Styled.DetailEventImage src={eventDetailData?.eventImageFile}></Styled.DetailEventImage>
      </Styled.DetailEventImageWarpper>

      <Styled.DetailInfoWrapper>
        <Styled.DetailEventTitleWrapper>
          <Styled.DetailEventTitle>{eventDetailData?.eventTitle}</Styled.DetailEventTitle>
          {eventDetailData?.eventDate}
        </Styled.DetailEventTitleWrapper>
        <Styled.DetailEventDescriptionWrapper>
          {eventDetailData?.eventIntroduction}
        </Styled.DetailEventDescriptionWrapper>
      </Styled.DetailInfoWrapper>
    </>
  );
}

const Styled = {
  DetailTopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    padding: 10rem 10rem 0;
    margin-bottom: 5rem;
  `,

  EventBackBtnIcon: styled(EventBackBtnIc)`
    width: 1.7rem;

    cursor: pointer;
  `,

  DdayText: styled.p`
    ${({ theme }) => theme.fonts.pretendard_text30};
    color: ${({ theme }) => theme.colors.main};
  `,

  DetailEventImage: styled.img`
    width: 100%;
    aspect-ratio: 1/1;

    /* padding: 0 10rem; */
  `,

  DetailEventImageWarpper: styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
  `,

  DetailInfoWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    gap: 10rem;

    width: 100%;
    padding: 10rem 10rem 20rem 10rem;

    white-space: pre-line;

    user-select: text;
  `,

  DetailInfo: styled.div`
    width: 66.7rem;

    ${({ theme }) => theme.fonts.pretendard_text40};
    color: ${({ theme }) => theme.colors.white};

    letter-spacing: -0.4px;
  `,

  DetailEventTitleWrapper: styled.div``,

  DetailEventTitle: styled.h1`
    ${({ theme }) => theme.fonts.pretendard_heading70};
    color: ${({ theme }) => theme.colors.white};

    letter-spacing: -0.7px;

    margin-bottom: 5rem;
  `,

  DetailEventDescriptionWrapper: styled.div`
    width: 85.3rem;

    ${({ theme }) => theme.fonts.pretendard_text28};
    color: ${({ theme }) => theme.colors.white};
  `,
};
