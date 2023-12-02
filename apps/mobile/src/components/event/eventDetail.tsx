import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useGetEventDetail } from "../../hooks/queries/admin/event";
import usePrevPage from "../../hooks/common/usePrevPage";

export default function EventDetail() {
  const { eventId } = useParams();

  const { eventDetailData } = useGetEventDetail(Number(eventId));

  const { handleMovePrevPage } = usePrevPage();

  return <></>;
}

const Styled = {};
