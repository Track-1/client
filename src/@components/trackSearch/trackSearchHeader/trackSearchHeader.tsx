import TrackSearchHeaderNav from "./trackSearchHeaderNav";
import TrackSearchHeaderButton from "./trackSearchHeaderButton";
import styled from "styled-components";

export default function TrackSearchHeader() {
  return (
    <HeaderWrapper>
      <TrackSearchHeaderNav />
      <TrackSearchHeaderButton />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  margin-left: 56.2rem;
`;
