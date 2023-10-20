import styled from "styled-components";
import { useGetRecentTracks } from "../../../hooks/queries/tracks";
import { FilteredTrackType } from "../../../type/tracks";
import { useState } from "react";
import RecentTrackItem from "./recentTrackInfo";

export default function RecentTrackList() {
  const { recentTrackInfo } = useGetRecentTracks(4);
  const [playingTrack, setPLayingTrack] = useState<FilteredTrackType["trackId"] | null>(null);

  function selectTrack(trackId: FilteredTrackType["trackId"]) {
    setPLayingTrack(trackId);
  }

  if (recentTrackInfo === undefined) return null;

  return (
    <Styled.Container>
      {recentTrackInfo?.map((trackInfo) => (
        <RecentTrackItem
          trackInfo={trackInfo}
          playingTrack={playingTrack}
          selectTrack={selectTrack}
          key={trackInfo.trackId}
        />
      ))}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};
