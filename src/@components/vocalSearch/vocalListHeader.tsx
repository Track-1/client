import styled from "styled-components";

import { VocalListHeaderSloganIc, VocalListHeaderTextIc } from "../../assets";

export default function TrackListHeader() {
  return (
    <TrackListHeaderWrapper>
      <TrackListHeaderSloganIcon />
      <StickerWrapper>
        <VocalListHeaderTextIcon />
      </StickerWrapper>
    </TrackListHeaderWrapper>
  );
}

const TrackListHeaderWrapper = styled.section`
  width: 150.9rem;

  display: flex;
  justify-content: space-between;
`;

const TrackListHeaderSloganIcon = styled(VocalListHeaderSloganIc)`
  margin: 2.6rem 0 0 9rem;
`;

const StickerWrapper = styled.article`
  display: inline-block;
`;

const VocalListHeaderTextIcon=styled(VocalListHeaderTextIc)`
  width: 37.5rem;
`
