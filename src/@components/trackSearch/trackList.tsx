import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useFilteredTracks } from "../../hooks/queries/tracks";
import ListTitle from "./listTitle";
import TrackItem from "./trackItem";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export default function TrackList() {
  const { trackData, fetchNextPage, hasNextPage } = useFilteredTracks({
    limit: 10,
    categ: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (trackData === undefined) return null;

  return (
    <Container>
      <ListTitle />
      {trackData[0].response.data?.[0].trackList?.map((trackInfo) => {
        return <TrackItem trackInfo={trackInfo} key={trackInfo.trackUserId} />;
      })}
      <div ref={observerRef} />
    </Container>
  );
}
