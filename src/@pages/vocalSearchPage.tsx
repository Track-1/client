import styled from "styled-components";
import Filter from "../@components/@common/filter";
import VocalList from "../@components/vocalSearch/vocalList";

const Wrapper = styled.section`
  display: flex;
`;
export default function VocalSearchPage() {
  return (
    <Wrapper>
      <Filter pageType="vocals" />
      <VocalList />
    </Wrapper>
  );
}
