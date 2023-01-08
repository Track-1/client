import styled from "styled-components";

import { TrackListHeaderSloganIc, VocalListHeaderTextIc } from "../../assets";

export default function TrackListHeader() {
  return (
    <TrackListHeaderWrapper>
      <TrackListHeaderSloganIcon />
      <StickerWrapper>
        <VocalListHeaderTextIc />
      </StickerWrapper>
    </TrackListHeaderWrapper>
  );
}

const TrackListHeaderWrapper = styled.section`
  width: 150.9rem;

  display: flex;
  justify-content: space-between;
`;

const TrackListHeaderSloganIcon = styled(TrackListHeaderSloganIc)`
  margin: 2.3rem 0 0 9rem;
`;

const StickerWrapper = styled.article`
  display: inline-block;
`;
