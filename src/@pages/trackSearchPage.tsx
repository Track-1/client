import styled from "styled-components";
import Filter from "../@components/@common/filter";
import TrackList from "../@components/trackSearch/trackList";
import { UploadButtonIc } from "../assets";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
`;
export default function TrackSearchPage() {
  return (
    <Wrapper>
      <Filter pageType="tracks" />
      <UploadButtonIcon />
      <TrackList />
    </Wrapper>
  );
}

const UploadButtonIcon = styled(UploadButtonIc)`
  position: absolute;

  width: 24.6rem;
  top: 67rem;
  left: 7.5rem;
`;
