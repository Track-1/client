import styled from "styled-components";
import BackButton from "../@common/backButton";
import AudioInfo from "./audioInfo";
import AudioTitle from "./audioTitle";
import Download from "./download";
import PlayButton from "./playButton";
import ProducerProfile from "./producerProfile";
import ShowMore from "./showMore";

export default function TrackPost() {
  return (
    <TrackPostWrapper>
      <AudioBasicInfoWrapper>
        <BackButton />
        <AudioTitle />
        <ProducerProfile />
        <MusicPlayingWrapper>
          <Download />
          <PlayButton />
          <ShowMore />
        </MusicPlayingWrapper>
      </AudioBasicInfoWrapper>
      <AudioInfo />
    </TrackPostWrapper>
  );
}

const MusicPlayingWrapper = styled.section`
  display: flex;
`;

const AudioBasicInfoWrapper = styled.li`
  display: flex;
  flex-direction: column;

  margin-left: 7.6rem;
`;

const TrackPostWrapper = styled.ul`
  display: flex;
`;
