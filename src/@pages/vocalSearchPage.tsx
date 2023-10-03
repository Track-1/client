import styled from "styled-components";
import Filter from "../@components/@common/filter";
import VocalList from "../@components/vocalSearch/vocalList";
import TrackSearchHeader from "../@components/trackSearch/trackSearchHeader/trackSearchHeader";

import Header from "../@components/@common/header";

const Wrapper = styled.section`
  display: flex;
`;
export default function VocalSearchPage() {
  return (
    <>
      <Header homeLogo>
        <TrackSearchHeader />
      </Header>
      <Wrapper>
        <Filter pageType="vocals" />
        <VocalList />
      </Wrapper>
    </>
  );
}
