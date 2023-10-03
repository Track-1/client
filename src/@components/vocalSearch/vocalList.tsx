import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useFilteredVocals } from "../../hooks/queries/vocals";
import { FilteredVocalType } from "../../type/vocals";
import ListTitle from "../trackSearch/listTitle";
import VocalItem from "./vocalItem";

const Container = styled.section`
  display: flex;
  flex-direction: column;

  margin-left: 30.9rem;
`;

const ListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;

  margin-left: 30.9rem;
`;

export default function VocalList() {
  const [searchParams] = useSearchParams();
  const { vocalData, fetchNextPage, hasNextPage } = useFilteredVocals({
    limit: 10,
    categ: searchParams.getAll("categ"),
    trackSearch: Boolean(searchParams.get("trackSearch")),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<FilteredVocalType["userId"] | null>(null);

  function selectTrack(trackId: FilteredVocalType["userId"]) {
    setPLayingTrack(trackId);
  }

  if (vocalData === undefined) return null;

  return (
    <Container>
      <ListTitle />
      <ListWrapper>
        {vocalData.map((vocalInfo) => {
          return (
            <VocalItem
              vocalInfo={vocalInfo}
              key={vocalInfo.userId}
              playingTrack={playingTrack}
              selectTrack={selectTrack}
            />
          );
        })}
        <div ref={observerRef} style={{ width: "100%", height: "20px" }} />
      </ListWrapper>
    </Container>
  );
}
