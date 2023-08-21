import styled from "styled-components";
import ListTitle from "./listTitle";
import TrackItem from "./trackItem";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export default function TrackList() {
  return (
    <Container>
      <ListTitle />
      <TrackItem />
      <TrackItem />
      <TrackItem />
      <TrackItem />
      <TrackItem />
      <TrackItem />
      <TrackItem />
      <TrackItem />
      <TrackItem />
    </Container>
  );
}
