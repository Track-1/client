import styled from "styled-components";
import { useFilteredVocals } from "../../hooks/queries/vocals";
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
  const { vocalData } = useFilteredVocals({
    limit: 10,
    categ: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    trackSearch: true,
  });

  if (vocalData === undefined) return null;

  return (
    <Container>
      <ListTitle />
      <ListWrapper>
        {vocalData.map((vocalInfo) => {
          return <VocalItem vocalInfo={vocalInfo} key={vocalInfo.userId} />;
        })}
      </ListWrapper>
    </Container>
  );
}
