import styled from "styled-components";
import ListTitle from "../trackSearch/listTitle";
import VocalItem from "./vocalItem";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const ListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

export default function VocalList() {
  return (
    <Container>
      <ListTitle />
      <ListWrapper>
        <VocalItem />
        <VocalItem />
        <VocalItem />
        <VocalItem />
        <VocalItem />
        <VocalItem />
        <VocalItem />
        <VocalItem />
      </ListWrapper>
    </Container>
  );
}
