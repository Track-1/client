import styled from "styled-components";
import { useGetEventList } from "../../hooks/queries/admin/event";
import { useNavigate } from "react-router-dom";

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

  return <></>;
}

const Styled = {};
