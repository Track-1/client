import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useFilteredTracks } from "../../hooks/queries/tracks";
import ListTitle from "./listTitle";
import TrackItem from "./trackItem";

const Container = styled.section`
  display: flex;
  flex-direction: column;

  margin-left: 30.9rem;
`;

export default function TrackList() {
  const [searchParams] = useSearchParams();
  const { trackData, fetchNextPage, hasNextPage } = useFilteredTracks({
    limit: 10,
    categ: searchParams.getAll("categ"),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (trackData === undefined) return null;

  return (
    <Container>
      <ListTitle />
      {trackData.map((trackInfo) => {
        return <TrackItem trackInfo={trackInfo} key={trackInfo.trackUserId} />;
      })}
      <div ref={observerRef} style={{ width: "100%", height: "20px" }} />
    </Container>
  );
}
