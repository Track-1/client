import styled from "styled-components";
import { useState } from "react";
import { useGetEventList } from "../../hooks/queries/admin/event";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";

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

  return <></>;
}

const Styled = {};
